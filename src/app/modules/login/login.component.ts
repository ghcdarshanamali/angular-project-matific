import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isLoginMode = true;
  public isLoading = false;
  public errorMessage : string = null;
  private response : AuthResponseData;
  public loginForm: NgForm;


  constructor(private authService: AuthService, private router: Router){}

  public onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
}

public onSubmit(form: NgForm){

    this.errorMessage = null; 
    this.isLoading = true;

    if(!form.valid){
        return
    }
   
    const email = form.value.email;
    const password = form.value.password;
    this.response = this.authService.loginOrSignUp(email, password, this.isLoginMode);

    if(this.response.success){
        this.router.navigate(['/snapshot-reports']);
    }else{
        this.isLoading = false;
        this.errorMessage = this.response.messsage;
        
    }
         form.reset();
}
}
