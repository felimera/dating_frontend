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

  putAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${idAppointment}`, appointment);
  }
}
