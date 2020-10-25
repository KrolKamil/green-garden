import { AwilixContainer } from "awilix";
import { UserBaseModel } from "../../src/app/features/users/models/user-base.model";
import { createUserBaseDTO } from "../../src/app/features/users/models/user-base.dto";
import { TokenService } from "../../src/app/services/token.service";

export function loginHelper(container: AwilixContainer, user: UserBaseModel) {
  const tokenService: TokenService = container.resolve("tokenService");
  const userDTO = createUserBaseDTO(user);
  return {
    accessToken: tokenService.getAccessToken(userDTO),
    refreshToken: tokenService.getRefreshToken(userDTO),
  };
}
