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

  putCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  getAnyCustomerWithQueryParameters(id?: number, fillName?: string, email?: string): Observable<Customer[]> {
    let url = this.apiUrl + '/anyfilter?';
    if (id) {
      url = url + 'id=' + id;
    }
    if (fillName) {
      if (id) {
        url = url + '&'
      }
      url = url + 'fillName=' + fillName;
    }
    if (email) {
      if (id || fillName) {
        url = url + '&';
      }
      url = url + 'email=' + email;
    }
    return this.http
      .get<Customer[]>(url)
      .pipe(map((apiCustomer) => apiCustomer.map(CustomerMapper.fromApiToDomain)));
  }

  getConsultCustomerInAppointmentForVariousParameters(nameCustomer: string): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.apiUrl}/anyfilter/aforementioned?nameCustomer=${nameCustomer}`)
      .pipe(map((apiCustomer) => apiCustomer.map(CustomerMapper.fromApiToDomain)));
  }
}
