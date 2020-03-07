import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../prestation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-collaborateurs',
  templateUrl: './admin-collaborateurs.component.html',
  styleUrls: ['./admin-collaborateurs.component.css']
})
export class AdminCollaborateursComponent implements OnInit {
  public collaborateurs;
  public mode = 'list';
  currentCollaborateur;
  colForm: FormGroup;
  val;
  selectservice = this.fb.group({
    sername: ['', [Validators.required]],
    colname: ['', [Validators.required]]
  });
  private services;
  private isSubmitted = false;
  private data;

  constructor(private prestService: PrestationService, public fb: FormBuilder, private router: Router) {
  }

  get serName() {
    return this.selectservice.get('sername');
  }

  ngOnInit() {
    this.onGetAllCollaborateurs();
    this.onGetAllServices();
  }

  onGetAllCollaborateurs() {
    this.prestService.getAllCollaborateurs()
      .subscribe(data => {
        this.collaborateurs = data;
      }, error => {
        console.log(error);
      });
  }

  onGetAllServices() {
    this.prestService.getAllServices()
      .subscribe(data => {
        this.services = data;
      }, error => {
        console.log(error);
      });
  }

  onDeletecollaborateur(col) {
    let c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.prestService.deleteRessource(col._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllCollaborateurs();
      }, error => {
        console.log(error);
      });
  }

  onNewcollaborateur() {
    this.mode = 'new-col';
  }

  back() {
    this.mode = 'list';
  }

  onSaveCol(data) {
    let url = this.prestService.host + '/collaborateurs';
    this.prestService.postRessource(url, data)
      .subscribe(data => {
        this.onGetAllCollaborateurs();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onEditcollaborateur(col) {
    this.prestService.getRessource(col._links.self.href)
      .subscribe(data => {
        this.currentCollaborateur = data;
        this.mode = 'edit-col';
      }, err => {
        console.log(err);
      });
  }

  onupdateCol(data) {
    this.prestService.putRessource(this.currentCollaborateur._links.self.href, data)
      .subscribe(data => {
        this.onGetAllCollaborateurs();
        this.mode = 'list';
      }, err => {
        console.log(err);
      });
  }

  onAffecttoservice(col) {
    this.prestService.getRessource(col._links.self.href)
      .subscribe(data => {
        this.currentCollaborateur = data;
        this.mode = 'affecttoservice';
      }, error => {
        console.log(error);
      });
  }

  changeservice(e) {
    console.log(e.value);
    this.serName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.selectservice.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.selectservice.value));
      this.Affectcoltoservice(this.selectservice.value);
    }
  }

  /*affectCol(data){
    return this.prestService.postRessource(this.prestService.host + '/addcollaborateur', data);
  }*/

  Affectcoltoservice(data) {
    this.prestService.postRessource(this.prestService.host + '/addcollaborateur', data)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('admincollaborateurs');
      }, err => {
        console.log(err);
      });
  }
}
