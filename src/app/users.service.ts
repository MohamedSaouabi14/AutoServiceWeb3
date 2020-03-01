import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public host3: string = 'http://localhost:8081';
  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  getAllUsers() {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host3 + '/appUsers', { headers: headers});
  }
  getRessource(url) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(url, { headers: headers});
  }
  deleteRessource(url) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, { headers: headers});
  }
  postRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(url, data, { headers: headers});
  }
  putRessource(url, data) {
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data, { headers: headers});
  }
}
