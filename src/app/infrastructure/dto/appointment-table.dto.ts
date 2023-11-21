import { ContentTableDTO } from "./content-table.dto";

export interface AppointmentTableDTO {
  idAppointment: number,
  fecha: string,
  precioTotal: number,
  contentTableList: Array<ContentTableDTO>
}
