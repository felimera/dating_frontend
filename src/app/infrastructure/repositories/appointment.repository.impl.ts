import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentRepository } from "src/app/core/repositories/appointment.repository";
import { AppointmentService } from "../services/appointment.service";
import { Appointment } from "src/app/core/models/appointment.model";
import { EntityGeneric } from "src/app/core/models/entity-generic.model";

@Injectable({
  providedIn: 'root',
})

export class AppointmentRepositoryImpl implements AppointmentRepository {

  constructor(private appointmentService: AppointmentService) { }

  postAppointment(appointment: Appointment): Observable<Appointment> {
    return this.appointmentService.postAppointment(appointment);
  }

  putAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment> {
    return this.appointmentService.putAppointment(idAppointment, appointment);
  }

  getById(idAppointment: number): Observable<Appointment> {
    return this.appointmentService.getById(idAppointment);
  }

  deleteAppointmentByAssignment(appointment: Appointment): Observable<any> {
    return this.appointmentService.deleteAppointmentByAssignment(appointment);
  }

  putAdminAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment> {
    return this.appointmentService.putAdminAppointment(idAppointment, appointment);
  }

  deleteAppointment(idAppointment:number):Observable<EntityGeneric>{
    return this.appointmentService.deleteAppointment(idAppointment);
  }
}
