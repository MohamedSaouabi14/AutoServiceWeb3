import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  public host: string = 'http://localhost:8083';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getAllFormations() {
    return this.http.get(this.host + '/formations');
  }
  getRessource(url) {
    return this.http.get(url);
  }

  deleteRessource(url) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, {headers: headers});
  }

  postRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(url, data, {headers: headers});
  }

  putRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data, {headers: headers});
  }


  uploadPhoto(file: File, idf): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    if (this.authService.jwt == null) {
      this.authService.loadToken();
    }
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idf, formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    });
    return this.http.request(req);
  }
}
