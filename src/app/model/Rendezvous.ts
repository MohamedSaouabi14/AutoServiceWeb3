import {ItemCollaborateur} from './ItemCollaborateur';
import {Client} from './Client';

export class Rendezvous {
  constructor(name: string) {this.name = name;
  }
  public name: string;
  public items: Map<number, ItemCollaborateur> = new Map();
  public client: Client;
}
