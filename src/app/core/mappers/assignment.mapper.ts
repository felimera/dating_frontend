import { AssignmentDTO } from 'src/app/infrastructure/dto/assignment.dto';

import { Assignment } from '../models/assignment.model';

export class AssignmentMapper {
  static fromApiToDomain(apiAssignment: AssignmentDTO): Assignment {
    return {
      id: apiAssignment.id,
      nombre: apiAssignment.nombre,
      descripcion: apiAssignment.descripcion,
      precio: apiAssignment.precio
    };
  }

  static fromDomainToApi(domainAssignment: Assignment): AssignmentDTO {
    return {
      id: domainAssignment.id,
      nombre: domainAssignment.nombre,
      descripcion: domainAssignment.descripcion,
      precio: domainAssignment.precio
    };
  }
}
