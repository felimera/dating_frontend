
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPassword } from 'src/app/core/models/user-password.model';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  private apiUrl = 'http://localhost:81/signup';

  constructor(private http: HttpClient) { }

  updatePassword(userPassword: UserPassword): Observable<any> {
    return this.http.put(this.apiUrl, userPassword);
  }
}
