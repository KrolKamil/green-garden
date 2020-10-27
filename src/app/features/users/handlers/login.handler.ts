import { FORBIDDEN } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { TokenService } from "../../../services/token.service";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { LoginError } from "../../../../errors/login.error";
import { HashService } from "../../../services/hash.service";
import { createUserBaseDTO } from "../models/user-base.dto";
import { HttpError } from "../../../../errors/http.error";

export interface LoginHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  tokenService: TokenService;
  hashService: HashService;
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;

  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute(command: LoginCommand) {
    const { userBaseRepository, tokenService, hashService } = this.dependencies;
    const { email, password, userType } = command.payload;

    const user = await userBaseRepository.findOne({ where: { email, type: userType, active: true } });
    if (!user) {
      throw new LoginError();
    }

    if (user.active === false) {
      throw new HttpError("User inactive", FORBIDDEN);
    }

    const passwordIsValid = await hashService.compare(password, user.password);
    if (!passwordIsValid) {
      throw new LoginError();
    }

    const userDTO = createUserBaseDTO(user);

    return {
      result: {
        accessToken: await tokenService.getAccessToken(userDTO),
        refreshToken: await tokenService.getRefreshToken(userDTO),
      },
    };
  }
}
