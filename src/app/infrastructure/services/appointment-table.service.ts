import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentTable } from 'src/app/core/models/appointment-table.model';
import { AppointmentTableMapper } from 'src/app/core/mappers/appointment-table.mapper';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTableService {

  private apiUrl = '/api/appointment';

  constructor(private http: HttpClient) { }

  getAppointmentByIdCustomer(idCustomer: number): Observable<Array<AppointmentTable>> {
    return this.http.get<Array<AppointmentTable>>(`${this.apiUrl}/customer?idCustomer=${idCustomer}`)
      .pipe(map((apiAppointmentTable) => apiAppointmentTable.map(AppointmentTableMapper.fromApiToDomain)));
  }

  getConsultQuoteWithAnyFilters(valid?: string, nameCustomer?: String): Observable<Array<AppointmentTable>> {
    let url = "/anyfilter?";
    if (valid)
      url = url + `valid=${valid}`;
    if (nameCustomer) {
      if (valid) {
        url = url + '&';
      }
      url = url + `nameCustomer=${nameCustomer}`
    }
    return this.http.get<Array<AppointmentTable>>(this.apiUrl + url)
      .pipe(map((apiAppointmentTable) => apiAppointmentTable.map(AppointmentTableMapper.fromApiToDomain)));
  }
}
