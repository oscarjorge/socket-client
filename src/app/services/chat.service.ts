import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) {

  }
  sendMessage(message: string){
    const payload = {
      from: this.wsService.user.name,
      body: message
    }
    this.wsService.emit('message', payload);
  }
  getMessage(): Observable<any>{
    return this.wsService.listen('message-new');
  }
  getPrivateMessage(): Observable<any>{
    return this.wsService.listen('message-private');
  }
}
