import { Component, OnInit } from '@angular/core';
import {PromopubService} from '../promopub.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FormationService} from '../formation.service';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  formations;
  editphoto: boolean;
  currentformation;
  SelectedFiles;
  progress;
  currentFileUpload;
  Timestamp = 0;
  constructor(public formationService: FormationService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.onGetAllFormation();
  }

  onGetAllFormation() {
    this.formationService.getAllFormations()
      .subscribe(data => {
        this.formations = data;
      }, error => {
        console.log(error);
      });
  }

  onEditPhoto(c) {
    this.currentformation = c;
    this.editphoto = true;
  }

  onSelectedFile(event) {
    this.SelectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.SelectedFiles.item(0);
    this.formationService.uploadPhoto(this.currentFileUpload, this.currentformation.id)
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
  onFormationDetails(c) {
    let url = btoa(c._links.formation.href);
    this.router.navigateByUrl('for-details/' + url);
  }
}
