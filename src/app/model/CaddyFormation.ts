import {Client} from './Client';
import {ItemFormation} from './ItemFormation';

export class CaddyFormation {
  constructor(name: string) {this.name = name;
  }
  public name: string;
  public items: Map<number, ItemFormation> = new Map();
  public client: Client;
}
