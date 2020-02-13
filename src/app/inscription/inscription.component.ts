import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }
  private jwt;
  ngOnInit() {
  }

  onRegister(data) {
    this.authService.register(data)
      .subscribe(resp => {
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err);
      });
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
}
