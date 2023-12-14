import { LinkRouter } from "./link-router.model";

export class AccessPermits {
  constructor(
    public listRouterList: LinkRouter[],
    public tipoRoleAcronym: string,
    public id?:number
  ) { }
}
