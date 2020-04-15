import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../prestation.service';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {

  services;
  mode = 'list';
  currentService;

  constructor(private prestService: PrestationService) {
  }

  ngOnInit() {
    this.onGetAllServices();
  }

  onGetAllServices() {
    this.prestService.getAllServices()
      .subscribe(data => {
        this.services = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteservice(ser) {
    let c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.prestService.deleteRessource(ser._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllServices();
      }, error => {
        console.log(error);
      });
  }

  onNewservices() {
    this.mode = 'new-ser';
  }

  onSaveSer(data) {
    let url = this.prestService.host + '/services';
    this.prestService.postRessource(url, data)
      .subscribe(data => {
        this.onGetAllServices();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onEditservice(ser) {
    this.prestService.getRessource(ser._links.self.href)
      .subscribe(data => {
        this.currentService = data;
        this.mode = 'edit-ser';
      }, err => {
        console.log(err);
      });
  }

  onupdateSer(data) {
    this.prestService.putRessource(this.currentService._links.self.href, data)
      .subscribe(data => {
        this.onGetAllServices();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  back() {
    this.mode = 'list';
  }
}
