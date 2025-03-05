import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { LoginUserModel } from "../models/login-user.model";
import { LoginService } from "../services/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,private loginService : LoginService,private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
   }

   get email() {
    return this.loginForm.get('email');
   }

   get password() {
    return this.loginForm.get('password');
   }

   ngOnInit(): void {
    
  }

  Login(data:LoginUserModel) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService.login(data).subscribe(
        (response) => {
          if (response.status === 'success') {
            console.log(response.name);
            this.router.navigate(['chat'], { queryParams: { name: response.name } });
          }
          else {
            window.alert(response.message);
          }
        }
      )
    }
  }
}
