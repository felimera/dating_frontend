import { AppointmentDTO } from 'src/app/infrastructure/dto/appointment.dto';
import { Appointment } from '../models/appointment.model';

export class AppointmentMapper {
  static fromApiToDomain(apiAppointment: AppointmentDTO): Appointment {
    return {
      id: apiAppointment.id,
      fecha: apiAppointment.fecha,
      hora: apiAppointment.hora,
      precioTotal: apiAppointment.precioTotal,
      idCustomer: apiAppointment.idCustomer,
      idAssignment: apiAppointment.idAssignment,
      idsAssignment: apiAppointment.idsAssignment
    };
  }

  static fromDomainToApi(domainAppointment: Appointment): AppointmentDTO {
    return {
      id: domainAppointment.id,
      fecha: domainAppointment.fecha,
      hora: domainAppointment.hora,
      precioTotal: domainAppointment.precioTotal,
      idCustomer: domainAppointment.idCustomer,
      idAssignment: domainAppointment.idAssignment,
      idsAssignment: domainAppointment.idsAssignment
    };
  }
}
