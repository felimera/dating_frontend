import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccessPermitsMapper } from 'src/app/core/mappers/access-permits.mapper';
import { AccessPermits } from 'src/app/core/models/access-permits.model';

@Injectable({
  providedIn: 'root'
})
export class AccessPermitsService {

  private apiUrl = '/api/accesspermits';

  constructor(private http: HttpClient) { }

  getAccessPermitsByIdCustomer(idCustomer: number): Observable<AccessPermits> {
    return this.http
      .get<AccessPermits>(`${this.apiUrl}/link?idCustomer=${idCustomer}`);
  }

  getAccessPermitsWithoutId(): Observable<AccessPermits> {
    return this.http.get<AccessPermits>(`http://localhost:82${this.apiUrl}/link`);
  }
}
