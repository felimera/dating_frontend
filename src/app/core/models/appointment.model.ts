export class Appointment {
  constructor(
    public id?: number,
    public fecha?: string,
    public hora?: string,
    public precioTotal?: number,
    public idCustomer?: number,
    public idAssignment?: number,
    public idsAssignment?: number[],
  ) { }
}
