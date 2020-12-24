import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client/build/index';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  private socket:Socket;
  public user: User;

  constructor() {
    this.socket = io(environment.wsUrl);
    this.checkStatus();
   }

   checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus=false;

    });
   }

   emit( event:string, payload?: any, callback?: Function ){
    this.socket.emit(event, payload, callback);
   }

   listen(event: string): Observable<any>{
      return new Observable(observer => {
        this.socket.on(event, msg => {
          observer.next(msg);
        });
      });
   }

   loginWS( name: string): Observable<any>{
    //TODO: jw token
    return new Observable(observer => {
      this.emit('user-config', {name: name}, (res)=>{
        this.user = new User(name)
        observer.next(res);
      })
    });

   }


}
