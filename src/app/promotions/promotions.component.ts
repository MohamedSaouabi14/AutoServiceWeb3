import { Component, OnInit } from '@angular/core';
import {PromopubService} from '../promopub.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  promotions;
  editphoto: boolean;
  currentpromotion;
  SelectedFiles;
  progress;
  currentFileUpload;
  Timestamp: number = 0;
  constructor(public promopubService: PromopubService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.onGetAllPromotions();
  }

  onGetAllPromotions() {
    this.promopubService.getAllPromotions()
      .subscribe(data => {
        this.promotions = data;
      }, error => {
        console.log(error);
      });
  }

  onEditPhoto(c) {
    this.currentpromotion = c;
    this.editphoto = true;
  }

  onSelectedFile(event) {
    this.SelectedFiles = event.target.files;
  }
  getTS() {
    return this.Timestamp;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  onPromotionDetails(c) {

  }
}

