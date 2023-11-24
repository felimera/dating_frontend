import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerRepository } from 'src/app/core/repositories/customer.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepositoryImpl implements CustomerRepository {

  constructor(private customerService: CustomerService) { }

  getByEmail(email: string): Observable<Customer> {
    return this.customerService.getByEmail(email);
  }

  putCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.customerService.putCustomer(id, customer);
  }
}
