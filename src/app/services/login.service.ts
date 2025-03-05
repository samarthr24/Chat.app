import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginUserModel } from "../models/login-user.model";

@Injectable ({
    providedIn: 'root',
})
export class LoginService {
    private apiUrl = 'https://localhost:7151/api/chat/';
constructor(private http: HttpClient) {}

  login(data: LoginUserModel) : Observable<any> {
    return this.http.post(this.apiUrl+'login', data);
  }
}