import { Component } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  StringConvert(str: string) {
    return JSON.stringify(str);
  }

  ngOnInit() {}

  sendMessage() {
    if (this.newMessage.trim() === '') return;
    this.chatService.messagesSubject.next([
      ...this.chatService.messagesSubject.getValue(),
      { text: this.newMessage, user: 'user' },
    ]);
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
    this.chatService.messagesSubject.subscribe(values=>{
      this.messages = values
    })
  }
}
