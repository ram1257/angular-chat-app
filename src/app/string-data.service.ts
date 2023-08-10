import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StringDataService {

  public stringObject: { [key: string]: string } = {
    user: 'user',
    assistant: 'assistant',
    assistantImage: 'assistant-image',
  };

  getString(key: string): string {
    return this.stringObject[key] || '';
  }

}
