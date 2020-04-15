import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PrestationService} from '../prestation.service';
import {Collaborateur} from '../model/collaborateur';
import {AuthenticationService} from '../authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-colldetails',
  templateUrl: './colldetails.component.html',
  styleUrls: ['./colldetails.component.css']
})
export class ColldetailsComponent implements OnInit {
  currentcollaborateur: Collaborateur;
  editphoto: boolean;
  SelectedFiles;
  progress;
  currentFileUpload;
  Timestamp: number = 0;
  mode: number = 0;

  constructor(private router: Router,private route: ActivatedRoute, public prestService: PrestationService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    console.log(url);
    this.prestService.getCollaborateur(url).subscribe(data => {
      this.currentcollaborateur = data;
    });
  }
  onEditPhoto(c) {
    this.currentcollaborateur = c;
    this.editphoto = true;
  }

  onSelectedFile(event) {
    this.SelectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.SelectedFiles.item(0);
    this.prestService.uploadPhotoCol(this.currentFileUpload, this.currentcollaborateur.id)
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
  onRDV(c) {

  }

  onEditCollaborateur() {
    this.mode = 1;
  }

  onUpdateCollaborateur(value: any) {

  }
}
