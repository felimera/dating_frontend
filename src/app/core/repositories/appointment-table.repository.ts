import { Observable } from "rxjs";
import { AppointmentTable } from "../models/appointment-table.model";

export abstract class AppointmentTableRepository {
  abstract getAppointmentByIdCustomer(idCustomer: number): Observable<Array<AppointmentTable>>;
}
