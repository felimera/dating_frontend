import { AppointmentTableDTO } from "src/app/infrastructure/dto/appointment-table.dto";
import { AppointmentTable } from "../models/appointment-table.model";

export class AppointmentTableMapper {
  static fromApiToDomain(apiAppointmentTable: AppointmentTableDTO): AppointmentTable {
    return {
      idAppointment: apiAppointmentTable.idAppointment,
      fecha: apiAppointmentTable.fecha,
      fechaSinFor: apiAppointmentTable.fechaSinFor,
      horaSinFor: apiAppointmentTable.horaSinFor,
      precioTotal: apiAppointmentTable.precioTotal,
      contentTableList: apiAppointmentTable.contentTableList,
      idMonth: apiAppointmentTable.idMonth,
      month: apiAppointmentTable.month,
      fillNameCustomer: apiAppointmentTable.fillNameCustomer,
      idCustomer: apiAppointmentTable.idCustomer
    };
  }

  static fromDomainToApi(domainAppointmentTable: AppointmentTable): AppointmentTableDTO {
    return {
      idAppointment: domainAppointmentTable.idAppointment,
      fecha: domainAppointmentTable.fecha,
      fechaSinFor: domainAppointmentTable.fechaSinFor,
      horaSinFor: domainAppointmentTable.horaSinFor,
      precioTotal: domainAppointmentTable.precioTotal,
      contentTableList: domainAppointmentTable.contentTableList,
      idMonth: domainAppointmentTable.idMonth,
      month: domainAppointmentTable.month,
      fillNameCustomer: domainAppointmentTable.fillNameCustomer,
      idCustomer: domainAppointmentTable.idCustomer
    };
  }
}
