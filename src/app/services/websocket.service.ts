import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client/build/index';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private  CHAT_USER: string  = 'chat-user'
  public socketStatus=false;
  private socket:Socket;
  public user: User;

  constructor(private cacheService: CacheService, private router: Router) {
    this.socket = io(environment.wsUrl);
    this.user = this.cacheService.getItem<User>(this.CHAT_USER)
    if(this.user)
      this.loginWS(this.user.name).subscribe(()=>{});
    this.checkStatus();
   }

   checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;

      this.loginWS(this.user?.name).subscribe(()=>{});
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
        this.cacheService.setItem(this.CHAT_USER, this.user);
        observer.next(res);
      })
    });
   }
   logoutWS(){
     this.user = null;
     this.cacheService.removeItem(this.CHAT_USER);
     const payload = {
       name: 'no name'
     }
     this.emit('user-config', payload, ()=>{});
     this.router.navigateByUrl('');
  }

}
