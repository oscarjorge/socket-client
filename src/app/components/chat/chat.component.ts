import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatElement', {static: false}) chatElement: ElementRef;
  public text: string;
  messages: any[] = [];
  getMessageSubscription: Subscription;
  constructor( private chatService: ChatService) { }


  ngOnInit(): void {
    this.getMessageSubscription =  this.chatService.getMessage().subscribe(msg=>{
      this.messages.push(msg);
      this.text='';
      setTimeout(() => {
        this.chatElement.nativeElement.scrollTop = this.chatElement.nativeElement.scrollHeight;
      }, 50);

    });

  }
  send(){
    if(this.text.trim().length>0)
    this.chatService.sendMessage(this.text.trim());
  }
  ngOnDestroy(): void {
    if(this.getMessageSubscription!=null)this.getMessageSubscription.unsubscribe();
  }
}
