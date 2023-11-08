import { Injectable } from "@angular/core";
import { UserSignupRepository } from "src/app/core/repositories/user-signup.repository";
import { UserSignupService } from "../services/user-signup.service";
import { Observable } from "rxjs";
import { UserSignup } from "src/app/core/models/user-signup.model";

@Injectable({
  providedIn: 'root',
})

export class UserSignupRepositoryImpl implements UserSignupRepository {

  constructor(private userSignupService: UserSignupService) { }

  createUser(userSignup: UserSignup): Observable<any> {
    return this.userSignupService.createUser(userSignup);
  }
}
