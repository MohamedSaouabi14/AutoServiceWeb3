import { Component, OnInit } from '@angular/core';
import {FormationService} from '../formation.service';

@Component({
  selector: 'app-admin-formations',
  templateUrl: './admin-formations.component.html',
  styleUrls: ['./admin-formations.component.css']
})
export class AdminFormationsComponent implements OnInit {

  formations;
  mode = 'list';
  currentformation;

  constructor(private formationService: FormationService) {
  }

  ngOnInit(): void {
    this.onGetAllformations();
  }
  onGetAllformations() {
    this.formationService.getAllFormations()
      .subscribe(data => {
        this.formations = data;
      }, error => {
        console.log(error);
      });
  }
  onDeleteformation(form) {
    let c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.formationService.deleteRessource(form._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllformations();
      }, error => {
        console.log(error);
      });
  }
  onNewformation() {
    this.mode = 'new-for';
  }
  back() {
    this.mode = 'list';
  }

  onSavefor(data) {
    let url = this.formationService.host + '/formations';
    this.formationService.postRessource(url, data)
      .subscribe(data => {
        this.onGetAllformations();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onEditformation(form) {
    this.formationService.getRessource(form._links.self.href)
      .subscribe(data => {
        this.currentformation = data;
        this.mode = 'edit-for';
      }, err => {
        console.log(err);
      });
  }

  onupdatefor(data) {
    this.formationService.putRessource(this.currentformation._links.self.href, data)
      .subscribe(data => {
        this.onGetAllformations();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }
}
