import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignup } from 'src/app/core/models/user-signup.model';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  private apiUrl = 'http://localhost:81/signup';

  constructor(private htpp: HttpClient) { }

  createUser(userSignup: UserSignup): Observable<any> {
    return this.htpp.post(this.apiUrl, userSignup);
  }
}
