import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  appUsers;
  mode='list';
  host2: string = 'http://localhost:8080';
  constructor(private usersService: UsersService,private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.onGetAllUsers();
  }
  onGetAllUsers() {
    this.usersService.getAllUsers()
      .subscribe(data => {
        this.appUsers = data;
      }, error => {
        console.log(error);
      });
  }
  onSaveUsers(data) {
    let url = this.usersService.host3 + '/appUsers';
    this.usersService.postRessource(url, data)
      .subscribe(data =>{
        this.onGetAllUsers();
        this.mode='list';
      },err=>{
        console.log(err);
      });
  }

  onDeleteUser(u) {
    let c = confirm('Etes vous sure?');
    if (!c) return;
    this.usersService.deleteRessource(u._links.self.href)
      .subscribe(data => {
        this.mode='list';
        this.onGetAllUsers();
      }, error => {
        console.log(error);
      });
  }

  onNewUsers() {
    this.mode='new-user';
  }
  currentUser;
  onEditUser(u) {
    this.usersService.getRessource(u._links.self.href)
      .subscribe(data => {
        this.currentUser = data;
        this.mode='edit-user';
      },err=>{
        console.log(err);
      });
  }
  addRole(data) {
    return this.usersService.postRessource(this.host2 + '/addrole', data);
  }
  onaddRole(data){
    this.addRole(data)
      .subscribe(resp => {
        console.log(resp);
      }, err => {
        console.log(err);
      });
  }

  onupdateUsers(data) {
    this.usersService.putRessource(this.currentUser._links.self.href, data)
      .subscribe(data =>{
        this.onGetAllUsers();
        this.mode='list';
      },err=>{
        console.log(err);
      });
  }
}
