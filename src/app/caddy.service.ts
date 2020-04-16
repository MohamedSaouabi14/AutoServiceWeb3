import { Injectable } from '@angular/core';
import {ItemFormation} from './model/ItemFormation';
import {Formation} from './model/formation';
import {CaddyFormation} from './model/CaddyFormation';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  currentCaddyName: string = 'CaddyFormation';
  public caddies: Map<string, CaddyFormation> = new Map();
  constructor() {
    let caddies = localStorage.getItem('myCaddies');
    if(caddies){
      this.caddies = JSON.parse(caddies);
    }
    else {
      let caddy = new CaddyFormation(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName, caddy);
    }
  }
  public addFormationToCaddy(formation: Formation): void {
    let caddy = this.caddies.get(this.currentCaddyName);
    let formationItem: ItemFormation = caddy.items.get(formation.id);
    if (!formationItem){
      formationItem = new ItemFormation();
      formationItem.price = formation.price;
      formationItem.formation = formation;
      caddy.items.set(formation.id, formationItem);
      this.saveCaddies();
    }
  }
  getCurrentCaddy(): CaddyFormation {
    return this.caddies.get(this.currentCaddyName);
}
  public saveCaddies() {
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }

  public getTotal(): number {
    let total = 0;
    let items: IterableIterator<ItemFormation> = this.getCurrentCaddy().items.values();
    for (let fi of items){
      total += fi.price;
    }
    return total;
  }
}
