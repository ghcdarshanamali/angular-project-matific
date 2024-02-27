import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Messages } from '../commons/constants';

export class AuthResponseData {
  constructor(public success: boolean, public messsage: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: User;
  private userList: User[] = [
    { email: 'abc@qwe.com', key: '12345' },
    { email: 'sdf@dfg.com', key: '2345' },
    { email: 'dfg@asd.com', key: '12345' },
  ];
  private validUser: User;
  private response: AuthResponseData;
  public user = new BehaviorSubject<User>(null);

  private salt: string = bcrypt.genSaltSync(10);
  private encodedPass: string;
  private timestamp;
  private key: string;

  constructor(private http: HttpClient, private router: Router) {}

  /*Login/SignUp - both fuctions use the same method and the seperate implenetion for each fuctionality was
     implemented in the condtion blocks(if-else)*/
  public loginOrSignUp(
    emailValue: string,
    passwordValue: string,
    isLogin: boolean
  ): AuthResponseData {
    this.userData = new User(emailValue, passwordValue); //this.hashEncription(passwordValue) - hash encription of the pw
    this.validUser = this.userList.find((x) => x.email === emailValue);
    /* this.http.get<User[]>('https://angular-project-default-rtdb.firebaseio.com/users.json').subscribe(
        (response) => {
            this.userList = response;
            
        }
    )  */
    if (isLogin) {
      //Login function
      if (this.validUser.key === this.userData.key) {
        //bcrypt.compareSync(this.validUser.key, this.userData.key - comparison of the bycrypt value
        this.response = new AuthResponseData(true, Messages.SUCCESS);
        this.user.next(this.validUser);
        localStorage.setItem('userData', JSON.stringify(this.validUser));
        //used the localStorage for credentials. however the retrival of the userDetails is not implemented yet.
      } else {
        this.response = new AuthResponseData(
          false,
          Messages.PASSWORD_INCORRECT
        );
        this.user.next(null);
      }
    } else {
      //Signup function
      if (this.validUser != null) {
        this.response = new AuthResponseData(false, Messages.USER_EXISTS);
        this.user.next(null);
      } else {
        this.userList.push(this.userData);
        this.response = new AuthResponseData(true, 'Success');
        this.user.next(this.userData);
        localStorage.setItem('userData', JSON.stringify(this.userData));
      }
      /* this.http.post('https://angular-project-default-rtdb.firebaseio.com/users.json', this.userData).subscribe(
            (response) => {
                console.log("response",response);
            }
        ); */
    }
    return this.response;
  }

  public logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
  }
  //Hash encryption was added to encript the password. However, due to the erroers I got during the implementation, I had to commented out this code.
  private hashEncription(passKey: string) {
    this.timestamp = Date.now();
    this.key = this.salt + this.timestamp;
    this.encodedPass = bcrypt.hashSync(passKey, this.key);
    return this.encodedPass;
  }
}
