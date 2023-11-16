import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomerMapper } from 'src/app/core/mappers/customer.mapper';
import { Customer } from 'src/app/core/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = '/api/customer';

  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<Customer> {
    return this.http
      .get<Customer>(`${this.apiUrl}/findemail?email=${email}`)
      .pipe(map((apiCustomer) => CustomerMapper.fromDomainToApi(apiCustomer)));
  }
}
