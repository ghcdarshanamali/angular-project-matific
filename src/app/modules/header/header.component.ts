import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public firstName: string = 'User';
  public isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //check the authentication of the user
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.firstName = user.email.substring(0, user.email.lastIndexOf('@'));
      }
    });
  }
  public onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
