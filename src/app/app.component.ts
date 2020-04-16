import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {CaddyService} from './caddy.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AutoServiceWeb';

  constructor(public authService: AuthenticationService, public caddyService: CaddyService) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
  }
}
