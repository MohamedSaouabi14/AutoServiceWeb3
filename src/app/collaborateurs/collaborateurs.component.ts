import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../prestation.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateursComponent implements OnInit {
  collaborateurs;
  constructor(private prestService: PrestationService ,
              private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd)  {
        let url = atob(route.snapshot.params.urlcol);
        console.log(url);
        this.getcollaborateurs(url);
      }
    });
  }

  ngOnInit() {
  }
  getcollaborateurs(url) {
    this.prestService.getRessource(url)
      .subscribe(data => {
        this.collaborateurs = data;
      }, err => {
        console.log(err);
      });

  }

}
