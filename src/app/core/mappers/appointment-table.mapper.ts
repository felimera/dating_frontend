import { AppointmentTableDTO } from "src/app/infrastructure/dto/appointment-table.dto";
import { AppointmentTable } from "../models/appointment-table.model";

export class AppointmentTableMapper {
  static fromApiToDomain(apiAppointmentTable: AppointmentTableDTO): AppointmentTable {
    return {
      idAppointment: apiAppointmentTable.idAppointment,
      fecha: apiAppointmentTable.fecha,
      precioTotal: apiAppointmentTable.precioTotal,
      contentTableList: apiAppointmentTable.contentTableList
    };
  }

  static fromDomainToApi(domainAppointmentTable: AppointmentTable): AppointmentTableDTO {
    return {
      idAppointment: domainAppointmentTable.idAppointment,
      fecha: domainAppointmentTable.fecha,
      precioTotal: domainAppointmentTable.precioTotal,
      contentTableList: domainAppointmentTable.contentTableList
    };
  }
}
