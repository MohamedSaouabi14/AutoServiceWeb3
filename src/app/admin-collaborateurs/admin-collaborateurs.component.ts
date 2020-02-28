import { Component, OnInit } from '@angular/core';
import {PrestationService} from '../prestation.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {stringify} from 'querystring';

@Component({
  selector: 'app-admin-collaborateurs',
  templateUrl: './admin-collaborateurs.component.html',
  styleUrls: ['./admin-collaborateurs.component.css']
})
export class AdminCollaborateursComponent implements OnInit {
  public collaborateurs;
  private services;
  public mode = 'list';
  private isSubmitted = false;
  currentCollaborateur;

  constructor(private prestService: PrestationService, public fb: FormBuilder, private router: Router) { }

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
    if (!c) return;
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

  selectservice = this.fb.group({
    sername: ['',[Validators.required]]
                               });
  private data;
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
      .subscribe( data => {
        this.currentCollaborateur = data;
        this.mode = 'affecttoservice';
      }, error => {
        console.log(error);
      });
  }

  changeservice(e) {
    console.log(e.value)
    this.serName.setValue(e.target.value,{
      onlySelf: true
    });
  }
  get serName(){
    return this.selectservice.get('sername');
  }
  onSubmit(){
    this.isSubmitted = true;
    if (!this.selectservice.valid){
      return false;
    } else {
      alert(JSON.stringify(this.selectservice.value));
      let colname:string = this.currentCollaborateur.name;
      let sername:string = this.selectservice.get('sername');
      let data={colname,sername};
      this.Affectcoltoservice(data);
    }
  }
  affectCol(data){
    return this.prestService.postRessource(this.prestService.host + '/addcollaborateur', data);
  }

  Affectcoltoservice(data){
    this.affectCol(data)
      .subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('admincollaborateurs');
    }, err => {
      console.log(err);
    });
  }
}
