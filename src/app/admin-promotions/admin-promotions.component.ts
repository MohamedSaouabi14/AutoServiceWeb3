import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {PromopubService} from '../promopub.service';
import {PrestationService} from '../prestation.service';

@Component({
  selector: 'app-admin-promotions',
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['./admin-promotions.component.css']
})
export class AdminPromotionsComponent implements OnInit {

  promotions;
  mode = 'list';
  currentpromotions;

  constructor(private promopubService: PromopubService) {
  }

  ngOnInit() {
    this.onGetAllpromotions();
  }

  onGetAllpromotions() {
    this.promopubService.getAllPromotions()
      .subscribe(data => {
        this.promotions = data;
      }, error => {
        console.log(error);
      });
  }

  onDeletepromotion(pro) {
    let c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.promopubService.deleteRessource(pro._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllpromotions();
      }, error => {
        console.log(error);
      });
  }

  onNewpromotions() {
    this.mode = 'new-pro';
  }
  back() {
    this.mode = 'list';
  }

  onSavepro(data) {
    let url = this.promopubService.host + '/promotions';
    this.promopubService.postRessource(url, data)
      .subscribe(data => {
        this.onGetAllpromotions();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onEditpromotion(pro) {
    this.promopubService.getRessource(pro._links.self.href)
      .subscribe(data => {
        this.currentpromotions = data;
        this.mode = 'edit-pro';
      }, err => {
        console.log(err);
      });
  }

  onupdatepro(data) {
    this.promopubService.putRessource(this.currentpromotions._links.self.href, data)
      .subscribe(data => {
        this.onGetAllpromotions();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }
}
