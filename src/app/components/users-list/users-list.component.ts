import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersObservable: Observable<any>;
  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.usersObservable = this.chatService.getUsers();

    this.chatService.emitUsers()
  }

}
