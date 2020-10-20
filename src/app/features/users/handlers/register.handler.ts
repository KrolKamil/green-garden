import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_COMMAND_TYPE, RegisterCommand } from "../commands/register.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import RegisterEvent from "../events/register.event";


export interface RegisterHandlerDependencies {
  eventDispatcher: EventDispatcher;
}

export default class RegisterHandler implements CommandHandler<RegisterCommand> {
  public commandType: string = REGISTER_COMMAND_TYPE;
  
  constructor(private dependencies: RegisterHandlerDependencies) {}

  async execute(command: RegisterCommand) {
    // execute body
    await this.dependencies.eventDispatcher.dispatch(new RegisterEvent(command))

    return {
      result: command
    }
  };
}
