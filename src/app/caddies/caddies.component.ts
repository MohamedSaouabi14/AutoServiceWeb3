import {Component, OnInit} from '@angular/core';
import {CaddyService} from '../caddy.service';
import {ItemFormation} from '../model/ItemFormation';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {CaddyFormation} from '../model/CaddyFormation';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
  public caddy: CaddyFormation;

  constructor(public caddyService: CaddyService, public authService: AuthenticationService, public router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }
    this.caddy = this.caddyService.getCurrentCaddy();
    console.log(this.caddy);
  }

  onRemoveFormationFromCaddy(formationItem: ItemFormation) {
    this.caddyService.removeFormation(formationItem.id);
  }
}
