import { AccessPermitsDTO } from "src/app/infrastructure/dto/access-permits.dto";
import { AccessPermits } from "../models/access-permits.model";

export class AccessPermitsMapper {
  static fromApiToDomain(apiAccessPermits: AccessPermitsDTO): AccessPermits {
    return {
      id:apiAccessPermits.id,
      listRouterList: apiAccessPermits.listRouterList,
      tipoRoleAcronym: apiAccessPermits.tipoRoleAcronym
    };
  }

  static fromDomainToApi(domainAccessPermits: AccessPermits): AccessPermitsDTO {
    return {
      id:domainAccessPermits.id,
      listRouterList: domainAccessPermits.listRouterList,
      tipoRoleAcronym: domainAccessPermits.tipoRoleAcronym
    };
  }
}
