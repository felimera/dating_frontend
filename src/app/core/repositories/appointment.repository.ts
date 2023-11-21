import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";

export abstract class AppointmentRepository {
  abstract postAppointment(appointment: Appointment): Observable<Appointment>;
  abstract putAppointment(idAppointment: number, appointment: Appointment): Observable<Appointment>;
}
