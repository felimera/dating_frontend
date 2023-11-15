export class Customer {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public telefono: string,
    public correo: string,
    public rol: string,
    public genero: string,
    public fechaNacimiento: string
  ) { }
}
