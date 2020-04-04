import { Component, OnInit } from '@angular/core';
import {PromopubService} from '../promopub.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-publicites',
  templateUrl: './admin-publicites.component.html',
  styleUrls: ['./admin-publicites.component.css']
})
export class AdminPublicitesComponent implements OnInit {
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
              private authService: AuthenticationService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = atob(route.snapshot.params.urlcol);
        console.log(url);
        this.getpromotions(url);
      }
    });
  }

  ngOnInit(): void {
  }

  getpromotions(url) {
    this.promopubService.getRessource(url)
      .subscribe(data => {
        this.promotions = data;
        console.log(data);
      }, err => {
        console.log(err);
      });

  }

  onEditPhoto(c) {
    this.currentpromotion = c;
    this.editphoto = true;
  }

  onSelectedFile(event) {
    this.SelectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.SelectedFiles.item(0);
    this.promopubService.uploadPhoto(this.currentFileUpload, this.currentpromotion.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          this.Timestamp = Date.now();
        }
      }, err => {
        alert('Problème de chargement !');
      });
    this.SelectedFiles = undefined;
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
  onPublicitesDetails(c) {

  }
}
