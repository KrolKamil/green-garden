import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_COMMAND_TYPE, RegisterCommand } from "../commands/register.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";


export interface RegisterHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class RegisterHandler implements CommandHandler<RegisterCommand> {
  public commandType: string = REGISTER_COMMAND_TYPE;
  
  constructor(private dependencies: RegisterHandlerDependencies) {}

  async execute(command: RegisterCommand) {
    const {userBaseRepository} = this.dependencies;
    const {email, password, invite} = command.payload;

    const existingUser = userBaseRepository.find({email});
    if(existingUser)
      throw new HttpError('Email is occupied', BAD_REQUEST);

    // const hasedPassword = something(password);

    return {
      result: command
    }
  };
}
