import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.scss'
})
export class ChatComponentComponent {
  // user = 'User' + Math.floor(Math.random() * 1000);
  user : any;
  message = '';
  messages: Array<{ user: string, message: string }> = [];

  public privateReceiver: string = '';
  public privateMessages: string[] = [];
  public chatMessages: string[] = [];

  constructor(private chatService: ChatService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.user = params.get('name');
    });

    this.chatService.startConnection();

    this.chatService.onMessageReceived().subscribe(message => {
      this.messages.push(message);
    });

    this.chatService.onPrivateMessageReceived().subscribe(msg => {
      this.privateMessages.push(`Private from ${msg.sender}: ${msg.message}`);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.user, this.message);
      this.message = '';
    }
  } 

  sendPrivateMessage(): void {
    if (this.user && this.privateReceiver && this.message) {
      this.chatService.sendPrivateMessage(this.user, this.privateReceiver, this.message);
      this.message = '';
    }
  }
}