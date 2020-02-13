import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  public host: string = 'http://localhost:8087';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  getAllServices() {
    return this.http.get(this.host + '/services');
  }
  getRessource(url) {
    return this.http.get(url);
  }
  deleteRessource(url) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, { headers : headers});
  }
  postRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(url, data , { headers : headers});
  }
  putRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data , { headers: headers});
  }
}
