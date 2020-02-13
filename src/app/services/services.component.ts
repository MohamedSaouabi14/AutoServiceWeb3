import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../prestation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private prestService: PrestationService, private router: Router) { }
  services;
  currentServices;
  ngOnInit() {
    this.prestService.getAllServices()
      .subscribe(data => {
        this.services = data;
      }, err => {
        console.log(err);
      });
  }

  onGetCollaborateur(ser) {
    this.currentServices = ser;
    let url = ser._links.collaborateurs.href;
    this.router.navigateByUrl('/collaborateurs/' + btoa(url));
  }
}
