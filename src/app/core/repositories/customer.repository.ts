import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";


export abstract class CustomerRepository {
  abstract getByEmail(email: string): Observable<Customer>
}
