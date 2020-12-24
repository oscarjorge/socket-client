import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  constructor(public wsService: WebsocketService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.wsService.loginWS(this.nombre).subscribe(user=>{
      this.router.navigateByUrl('/messages');
    });
  }
}
