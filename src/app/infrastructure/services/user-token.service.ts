import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserToken } from 'src/app/core/models/user-token.model';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  private apiUrl = 'http://localhost:81/login';

  constructor(private http: HttpClient) { }

  postToken(userToken: UserToken): Observable<any> {
    return this.http.post(this.apiUrl, userToken);
  }
}
