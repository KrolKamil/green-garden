import { CommandHandler } from "../../../../shared/command-bus";
import { REFRESH_ACCESS_TOKEN_COMMAND_TYPE, RefreshAccessTokenCommand } from "../commands/refresh-access-token.command";
import { TokenService } from "../../../../app/services/token.service";


export interface RefreshAccessTokenHandlerDependencies {
  tokenService: TokenService;
}

export default class RefreshAccessTokenHandler implements CommandHandler<RefreshAccessTokenCommand> {
  public commandType: string = REFRESH_ACCESS_TOKEN_COMMAND_TYPE;
  
  constructor(private dependencies: RefreshAccessTokenHandlerDependencies) {}

  async execute(command: RefreshAccessTokenCommand) {
    const {tokenService} = this.dependencies;
    const {refreshToken} = command.payload;

    const userDTO = await tokenService.verifyRefreshToken(refreshToken);

    return {
      result: {
        accessToken: tokenService.getAccessToken(userDTO),
        refreshToken: tokenService.getRefreshToken(userDTO)
      }
    }
  };
}
