import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './components/pages/login/login.component';
import { MessagesComponent } from './components/pages/messages/messages.component';
import { UserGuard } from './guards/user-guard';
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'messages', component: MessagesComponent, canActivate:[UserGuard]},
  {path: '**', component: LoginComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
