import { LinkRouterDTO } from "./link-router.dto";

export interface AccessPermitsDTO {
  listRouterList: LinkRouterDTO[],
  tipoRoleAcronym: string,
  id?:number
}
