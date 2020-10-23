import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { TokenService } from "../../../../app/services/token.service";

export interface LoginHandlerDependencies {
  tokenService: TokenService    
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;
  
  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute(command: LoginCommand) {
    // execute body

    return {
      result: command
    }
  };
}
