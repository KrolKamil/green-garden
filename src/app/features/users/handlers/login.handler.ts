import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { TokenService } from "../../../services/token.service";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { WorkspaceNotExistsError } from "../../../../errors/workspace-not-exists.error";
import { LoginError } from "../../../../errors/login.error";
import { HashService } from "../../../services/hash.service";
import { createUserBaseDTO } from "../models/user-base.dto";

export interface LoginHandlerDependencies {
  workspaceRepository: WorkspaceRepository;
  userBaseRepository: UserBaseRepository;
  tokenService: TokenService;
  hashService: HashService;
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;

  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute(command: LoginCommand) {
    const { workspaceRepository, userBaseRepository, tokenService, hashService } = this.dependencies;
    const { email, password, workspaceId } = command.payload;

    const workspace = await workspaceRepository.findOne({ id: workspaceId });
    if (!workspace) {
      throw new WorkspaceNotExistsError();
    }
    const user = await userBaseRepository.findOne({ where: { email, workspace }, relations: ["workspace"] });
    if (!user) {
      throw new LoginError();
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
