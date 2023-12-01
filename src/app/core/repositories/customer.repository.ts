import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

export abstract class CustomerRepository {
  abstract getByEmail(email: string): Observable<Customer>;
  abstract putCustomer(id: number, customer: Customer): Observable<Customer>;
  abstract getAnyCustomerWithQueryParameters(id?: number, fillName?: string, email?: string): Observable<Customer[]>;
}
