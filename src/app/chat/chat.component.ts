import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.push({ text: this.newMessage, user: 'user' });
    this.newMessage = '';
    this.chatService.sendMessage(this.messages[this.messages.length - 1].text);
  }
}
