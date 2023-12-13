import { EntityGenericDTO } from "src/app/infrastructure/dto/entity-generic.dto";
import { EntityGeneric } from "../models/entity-generic.model";

export class EntityGenericMapper {
  static fromApiToDomain(apiEntityGeneric: EntityGenericDTO): EntityGeneric {
    return {
      id: apiEntityGeneric.id,
      value: apiEntityGeneric.value,
      displased: apiEntityGeneric.displased
    };
  }

  static fromDomainToApi(domainEntityGeneric: EntityGeneric): EntityGenericDTO {
    return {
      id: domainEntityGeneric.id,
      value: domainEntityGeneric.value,
      displased: domainEntityGeneric.displased
    };
  }
}
