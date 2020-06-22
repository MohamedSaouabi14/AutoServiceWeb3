import {Client} from './client';
import {ItemFormation} from './ItemFormation';

export class Caddy {
  constructor(name: string) {this.name = name; }
  public name: string;
  public items: Map<string, ItemFormation> = new Map();
  public client: Client;
}
