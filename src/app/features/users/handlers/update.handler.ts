import { CommandHandler } from "../../../../shared/command-bus";
import { UPDATE_COMMAND_TYPE, UpdateCommand } from "../commands/update.command";
import { UserBaseRepository } from "../repositories/user-base.repository";

export interface UpdateHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class UpdateHandler implements CommandHandler<UpdateCommand> {
  public commandType: string = UPDATE_COMMAND_TYPE;

  constructor(private dependencies: UpdateHandlerDependencies) {}

  async execute(command: UpdateCommand) {
    const { userId, ...rest } = command.payload;
    const { userBaseRepository } = this.dependencies;

    await userBaseRepository.update({ id: userId }, { ...rest });

    return {
      result: {},
    };
  }
}
