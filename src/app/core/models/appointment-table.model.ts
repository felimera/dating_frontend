import { ContentTable } from "./content-table.model";

export class AppointmentTable {
  constructor(
    public idAppointment: number,
    public fecha: string,
    public fechaSinFor: string,
    public horaSinFor: string,
    public precioTotal: number,
    public contentTableList: Array<ContentTable>,
    public idMonth?: string,
    public month?: string,
    public fillNameCustomer?: string,
    public idCustomer?:number
  ) { }
}
