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
  publicites;
  mode = 'list';
  currentpublicite;

  constructor(private promopubService: PromopubService) {
  }

  ngOnInit() {
    this.onGetAllpublicites();
  }

  onGetAllpublicites() {
    this.promopubService.getAllPublicites()
      .subscribe(data => {
        this.publicites = data;
      }, error => {
        console.log(error);
      });
  }

  onDeletepublicite(pub) {
    let c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.promopubService.deleteRessource(pub._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllpublicites();
      }, error => {
        console.log(error);
      });
  }

  onNewpublicites() {
    this.mode = 'new-pub';
  }
  back() {
    this.mode = 'list';
  }

  onSavepub(data) {
    let url = this.promopubService.host + '/publicites';
    this.promopubService.postRessource(url, data)
      .subscribe(data => {
        this.onGetAllpublicites();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onEditpublicite(pub) {
    this.promopubService.getRessource(pub._links.self.href)
      .subscribe(data => {
        this.currentpublicite = data;
        this.mode = 'edit-pub';
      }, err => {
        console.log(err);
      });
  }

  onupdatepub(data) {
    this.promopubService.putRessource(this.currentpublicite._links.self.href, data)
      .subscribe(data => {
        this.onGetAllpublicites();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }
}
