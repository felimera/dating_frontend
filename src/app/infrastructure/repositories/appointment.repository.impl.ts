import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentRepository } from "src/app/core/repositories/appointment.repository";
import { AppointmentService } from "../services/appointment.service";
import { Appointment } from "src/app/core/models/appointment.model";

@Injectable({
  providedIn: 'root',
})

export class AppointmentRepositoryImpl implements AppointmentRepository {

  constructor(private appointmentService: AppointmentService) { }

  postAppointment(appointment: Appointment): Observable<Appointment> {
    return this.appointmentService.postAppointment(appointment);
  }

  getAppointmentByIdCustomer(idCustomer: number): Observable<Array<Appointment>> {
    return this.appointmentService.getAppointmentByIdCustomer(idCustomer);
  }
}
