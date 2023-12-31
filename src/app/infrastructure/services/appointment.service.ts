import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment.model';
import { MessageGenericDTO } from '../dto/message-generic.dto';

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

  getById(idAppointment: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${idAppointment}`);
  }

  deleteAppointmentByAssignment(appointment: Appointment): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: appointment,
    };
    return this.http.delete<any>(`${this.apiUrl}/assignment`, options);
  }

  putAdminAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/admin/${idAppointment}`, appointment);
  }

  deleteAppointment(idAppointment: number): Observable<MessageGenericDTO> {
    return this.http.delete<MessageGenericDTO>(`${this.apiUrl}/${idAppointment}`);
  }
}
