import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserTokenRepository } from "src/app/core/repositories/user-token.repository";
import { UserTokenService } from "../services/user-token.service";
import { UserToken } from "src/app/core/models/user-token.model";

@Injectable({
  providedIn: 'root',
})

export class UserTokenRepositoryImpl implements UserTokenRepository {

  constructor(private userTokenService: UserTokenService) { }

  postToken(userToken: UserToken): Observable<any> {
    return this.userTokenService.postToken(userToken);
  }
}
