import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuthenticated: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authEvent.subscribe(
      (authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
