import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import LoginEvent from "../events/login.event";


export interface LoginHandlerDependencies {
  eventDispatcher: EventDispatcher;
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;
  
  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute(command: LoginCommand) {
    // execute body
    await this.dependencies.eventDispatcher.dispatch(new LoginEvent(command))

    return {
      result: command
    }
  };
}
