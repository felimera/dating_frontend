export interface AppointmentDTO {
  id: number,
  fecha: string,
  hora: string,
  precioTotal: number,
  idCustomer: number,
  idAssignment: number,
  idsAssignment: number[],
}
