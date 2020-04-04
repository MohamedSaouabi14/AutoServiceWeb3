import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromopubService {


  public host: string = 'http://localhost:8082';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getAllPublicites() {
    return this.http.get(this.host + '/publicites');
  }

  getAllPromotions() {
    return this.http.get(this.host + '/promotions');
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


  uploadPhoto(file: File, idpr): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    if (this.authService.jwt == null) {
      this.authService.loadToken();
    }
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idpr, formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    });
    return this.http.request(req);
  }
}
