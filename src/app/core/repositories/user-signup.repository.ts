import { Observable } from "rxjs";
import { UserSignup } from "../models/user-signup.model";

export abstract class UserSignupRepository {
  abstract createUser(userSignup: UserSignup): Observable<any>;
}
