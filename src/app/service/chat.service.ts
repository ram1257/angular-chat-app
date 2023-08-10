import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messagesSubject = new BehaviorSubject<any[]>([]);
  public messages$: Observable<any[]> = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  APISelector(messageText: string) {
    const keyValues = ['photo', 'image', 'picture'];
    for (let i = 0; i <= keyValues.length; i++) {
      if (messageText.split(' ').includes(keyValues[i])) return true;
    }
    return false;
  }

  sendMessage(messageText: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // PUT YOUR API KEY here
      Authorization:
        'Bearer <YOUR_API_KEY>',
    });

    const data = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: messageText },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 50,
    };

    const ImageData = {
      model: 'image-alpha-001',
      prompt: messageText,
      num_images: 1,
      size: '512x512',
      response_format: 'url',
    };

    if (this.APISelector(messageText)) {
      this.http
        .post<any>('https://api.openai.com/v1/images/generations', ImageData, {
          headers,
        })
        .subscribe((response) => {
          console.log(response, 'image');
          const assistantMessage = response.data[0].url;
          const newMessage = { text: assistantMessage, user: 'assistant-image' };
          this.messagesSubject.next([
            ...this.messagesSubject.getValue(),
            newMessage,
          ]);
        });
    } else {
      this.http
        .post<any>('https://api.openai.com/v1/chat/completions', data, {
          headers,
        })
        .subscribe((response) => {
          const assistantMessage = response.choices[0].message.content;
          const newMessage = { text: assistantMessage, user: 'assistant' };
          this.messagesSubject.next([
            ...this.messagesSubject.getValue(),
            newMessage,
          ]);
        });
    }
  }
}
