import { Routes } from '@angular/router';
import {ChatComponentComponent} from '../app/chat-component/chat-component.component'
import {LoginComponentComponent} from '../app/login-component/login-component.component'

// export const routes: Routes = [
//     { path: 'chat', component: ChatComponentComponent }, // Route for your component
//   { path: '', redirectTo: '/chat', pathMatch: 'full' },
// ];

export const routes: Routes = [
  { path: 'chat', component: ChatComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
