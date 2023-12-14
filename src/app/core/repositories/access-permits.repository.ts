import { Observable } from "rxjs";
import { AccessPermits } from "../models/access-permits.model";

export abstract class AccessPermitsRepository {
  abstract getAccessPermitsByIdCustomer(idCustomer: number): Observable<AccessPermits>;
  abstract getAccessPermitsWithoutId(): Observable<AccessPermits>;
}
