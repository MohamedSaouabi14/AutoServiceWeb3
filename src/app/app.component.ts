import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoServiceWeb';

  private currentService;
  constructor(private authService: AuthenticationService,private router: Router) {
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

  onCollaborateursDispo() {
    this.currentService=undefined;
    this.router.navigateByUrl('/Collaborateurs/4/0');
  }
}
