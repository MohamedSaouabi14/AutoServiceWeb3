import { Component, OnInit } from '@angular/core';
import {PromopubService} from '../promopub.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-publicites',
  templateUrl: './publicites.component.html',
  styleUrls: ['./publicites.component.css']
})
export class PublicitesComponent implements OnInit {
  publicites;
  editphoto: boolean;
  currentpublicite;
  SelectedFiles;
  progress;
  currentFileUpload;
  Timestamp = 0;
  constructor(public prpubService: PromopubService , private route: ActivatedRoute,
              private router: Router, private authService: AuthenticationService) {}

ngOnInit() {
  this.prpubService.getAllPublicites()
    .subscribe(data => {
      this.publicites = data;
    }, err => {
      console.log(err);
    });
}

getpublicites(url) {
  this.prpubService.getRessource(url)
    .subscribe(data => {
      this.publicites = data;
      console.log(data);
    }, err => {
      console.log(err);
    });

}

onEditPhoto(c) {
  this.currentpublicite = c;
  this.editphoto = true;
}

onSelectedFile(event) {
  this.SelectedFiles = event.target.files;
}

uploadPhoto() {
  this.progress = 0;
  this.currentFileUpload = this.SelectedFiles.item(0);
  this.prpubService.uploadPhotoPub(this.currentFileUpload, this.currentpublicite.id)
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
}

