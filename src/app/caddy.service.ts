import { Injectable } from '@angular/core';
import {ItemFormation} from './model/ItemFormation';
import {Formation} from './model/formation';
import {CaddyFormation} from './model/CaddyFormation';


@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public currentCaddyName:string = 'CaddyFormation';
  public caddies: Map<string, CaddyFormation> = new Map();
  constructor() {
    let caddies = localStorage.getItem('CaddyFormation');
    if (caddies) {
      this.caddies = JSON.parse(caddies);
    }
    else {
      let caddyFormation = new CaddyFormation(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName, caddyFormation);
    }
  }

  public addFormationToCaddy(formation: Formation): void {
    let caddyFormation = this.caddies.get(this.currentCaddyName);
    let formationItem: ItemFormation = caddyFormation.items.get(formation.id);
    if(formationItem){
       alert ('Formation déja sélectionnée');
    }
    else if(!formationItem){
      formationItem = new ItemFormation();
      formationItem.price = formation.price;
      formationItem.formation = formation;
      caddyFormation.items.set(formation.id, formationItem);
      this.saveCaddies();
    }
  }
  public removeFormation(id: string): void {
    let caddyFormation = this.caddies.get(this.currentCaddyName);
    delete caddyFormation.items[id];
    this.saveCaddies();
  }
  getCurrentCaddy(): CaddyFormation{
    return this.caddies.get(this.currentCaddyName);
  }
  public getTotal(): number {
    let total = 0;
    let items: IterableIterator<ItemFormation> = this.getCurrentCaddy().items.values();
    for (let fi of items){
      total += fi.price;
    }
    return total;
  }
  public saveCaddies() {
    localStorage.setItem('CaddyFormation', JSON.stringify(this.caddies));
  }
  getCaddySize(){
    let caddy =this.getCurrentCaddy();
    return Object.keys(caddy.items).length;
  }
}
