import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../prestation.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateursComponent implements OnInit {
  collaborateurs;
  private editphoto: boolean;
  private currentcollaborateur;
  private SelectedFiles;
  private progress;
  private currentFileUpload;


  constructor(private prestService: PrestationService ,
              private route: ActivatedRoute, private router: Router,
              ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd)  {
        let url = atob(route.snapshot.params.urlcol);
        console.log(url);
        this.getcollaborateurs(url);
      }
    });
  }

  ngOnInit() {
  }
  getcollaborateurs(url) {
    this.prestService.getRessource(url)
      .subscribe(data => {
        this.collaborateurs = data;
      }, err => {
        console.log(err);
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
    this.progress= 0;
    this.currentFileUpload = this.SelectedFiles.item(0);
    this.prestService.uploadPhotoCol(this.currentFileUpload,this.currentcollaborateur.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        }
        else if (event instanceof HttpResponse){
          alert('Fin  de téléchargement ... !');
        }
      }, err => {
        alert('Problème de chargement !');
    })
    this.SelectedFiles = undefined;
  }
}
