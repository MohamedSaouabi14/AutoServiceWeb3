import {ItemFormation} from './ItemFormation';

export class CaddyFormation {
  constructor(name: string) {this.name = name; }
  public name: string;
  public items: Map<string, ItemFormation> = new Map();
}
