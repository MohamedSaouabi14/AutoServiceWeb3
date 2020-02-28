import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {AuthenticationService} from '../authentication.service';
import {HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user ;
  private username;
  private roles: Array<string>;
  constructor(private usersService: UsersService, private authService: AuthenticationService) { }

  ngOnInit() {
    let jwt =this.authService.jwt;
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(jwt)
    this.username = objJWT.sub;
    this.roles = objJWT.roles;
    console.log(this.username, this.roles);
  }


}
