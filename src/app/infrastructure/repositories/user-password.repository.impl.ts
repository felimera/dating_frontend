import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserPassword } from "src/app/core/models/user-password.model";
import { userPasswordRepository } from "src/app/core/repositories/user-password.repository";
import { UserPasswordService } from "../services/user-password.service";

@Injectable({
  providedIn: 'root',
})

export class userPasswordRespositoryImpl implements userPasswordRepository {

  constructor(private userPasswordService: UserPasswordService) { }
  
  updatePassword(userPassword: UserPassword): Observable<any> {
    return this.userPasswordService.updatePassword(userPassword);
  }
}
