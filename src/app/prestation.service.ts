import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Collaborateur} from './model/collaborateur';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  public host: string = 'http://localhost:8087';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getAllServices() {
    return this.http.get(this.host + '/services');
  }

  getAllCollaborateurs() {
    return this.http.get(this.host + '/collaborateurs');
  }

  getRessource(url) {
    return this.http.get(url);
  }
  getCollaborateur(url):Observable<Collaborateur>{
    return this.http.get<Collaborateur>(url);
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


  uploadPhotoCol(file: File, idCol): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    if (this.authService.jwt == null) {
      this.authService.loadToken();
    }
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idCol, formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    });
    return this.http.request(req);
  }
}
