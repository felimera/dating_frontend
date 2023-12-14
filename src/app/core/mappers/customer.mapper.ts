import { CustomerDTO } from "src/app/infrastructure/dto/customer.dto";
import { Customer } from "../models/customer.model";

export class CustomerMapper {
  static fromApiToDomain(apiCustomerDTO: CustomerDTO): Customer {
    return {
      id: apiCustomerDTO.id,
      nombre: apiCustomerDTO.nombre,
      apellido: apiCustomerDTO.apellido,
      telefono: apiCustomerDTO.telefono,
      correo: apiCustomerDTO.correo,
      rol: apiCustomerDTO.rol,
      genero: apiCustomerDTO.genero,
      fechaNacimiento: apiCustomerDTO.fechaNacimiento
    };
  }

  static fromDomainToApi(domainCustomer: Customer): CustomerDTO {
    return {
      id: domainCustomer.id,
      nombre: domainCustomer.nombre,
      apellido: domainCustomer.apellido,
      telefono: domainCustomer.telefono,
      correo: domainCustomer.correo,
      rol: domainCustomer.rol,
      genero: domainCustomer.genero,
      fechaNacimiento: domainCustomer.fechaNacimiento
    };
  }
}
