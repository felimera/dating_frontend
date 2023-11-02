import { UserToken } from "../models/user-token.model";
import { UserTokenDTO } from "src/app/infrastructure/dto/user-token.dto";


export class UserTokenMapper {
  static fromApiToDomain(userTokenDto: UserTokenDTO): UserToken {
    return {
      email: userTokenDto.email,
      password: userTokenDto.password
    };
  }

  static fromDomainToApi(domainUserToken: UserToken): UserTokenDTO {
    return {
      email: domainUserToken.email,
      password: domainUserToken.password
    }
  }
}
