import { Observable } from "rxjs";
import { UserToken } from "../models/user-token.model";

export abstract class UserTokenRepository {
  abstract postToken(userToken: UserToken): Observable<any>;
}
