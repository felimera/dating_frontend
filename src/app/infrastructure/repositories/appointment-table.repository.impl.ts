import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentTable } from "src/app/core/models/appointment-table.model";
import { AppointmentTableService } from "../services/appointment-table.service";


@Injectable({
  providedIn: 'root',
})

export class AppointmentTableRepository implements AppointmentTableRepository {
  constructor(private appointmentTableService: AppointmentTableService) { }

  getAppointmentByIdCustomer(idCustomer: number): Observable<Array<AppointmentTable>> {
    return this.appointmentTableService.getAppointmentByIdCustomer(idCustomer);
  }
}
