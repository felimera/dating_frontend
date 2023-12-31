import { ContentTableDTO } from "./content-table.dto";

export interface AppointmentTableDTO {
  idAppointment: number,
  fecha: string,
  fechaSinFor: string,
  horaSinFor: string,
  precioTotal: number,
  contentTableList: Array<ContentTableDTO>,
  idMonth?: string,
  month?: string,
  fillNameCustomer?: string,
  idCustomer?:number
}
