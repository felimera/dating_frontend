import { Observable } from "rxjs";
import { UserPassword } from "../models/user-password.model";

export abstract class userPasswordRepository {
  abstract updatePassword(userPassword: UserPassword): Observable<any>;
}
