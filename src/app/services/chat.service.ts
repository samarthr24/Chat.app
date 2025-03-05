import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private hubConnection: signalR.HubConnection;
    private messageSubject = new Subject<any>();
    user : any;

    constructor() {
      const userName = new URLSearchParams(window.location.search).get('name');
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7151/chatHub?name=${userName}`)
        .build();
    }

    startConnection(): void {
        this.hubConnection
          .start()
      }

      onMessageReceived(): Subject<any> {
        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
          this.messageSubject.next({ user, message });
        });
        return this.messageSubject;
      }

      onPrivateMessageReceived(): Subject<any> {
        const privateMessageSubject = new Subject<any>();

        this.hubConnection.on('ReceivePrivateMessage', (sender: string, message: string) => {
            privateMessageSubject.next({ sender, message });
        });
        return privateMessageSubject;
    }

      sendMessage(user: string, message: string): void {
        this.hubConnection.invoke('SendMessage', user, message)
      }

      sendPrivateMessage(sender: string, receiver: string, message: string): void {
        this.hubConnection.invoke('SendPrivateMessage', sender, receiver, message)
    }
}