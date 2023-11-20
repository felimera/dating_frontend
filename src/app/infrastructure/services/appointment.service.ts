import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentMapper } from 'src/app/core/mappers/appointment.mapper';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = '/api/appointment';

  constructor(private http: HttpClient) { }

  postAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getAppointmentByIdCustomer(idCustomer: number): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${this.apiUrl}/customer?idCustomer=${idCustomer}`)
      .pipe(map((apiAppointment) => apiAppointment.map(AppointmentMapper.fromApiToDomain)));
  }
}
