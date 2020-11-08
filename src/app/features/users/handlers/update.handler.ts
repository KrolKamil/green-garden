import { CommandHandler } from "../../../../shared/command-bus";
import { UPDATE_COMMAND_TYPE, UpdateCommand } from "../commands/update.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { deleteUndefinedProperties } from "../../../tools/delete-undefined-properties";

export interface UpdateHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class UpdateHandler implements CommandHandler<UpdateCommand> {
  public commandType: string = UPDATE_COMMAND_TYPE;

  constructor(private dependencies: UpdateHandlerDependencies) {}

  async execute(command: UpdateCommand) {
    const { userId, ...rest } = command.payload;
    const { userBaseRepository } = this.dependencies;
    const userFieldsToUpdate = deleteUndefinedProperties(rest);
    await userBaseRepository.update({ id: userId }, { ...userFieldsToUpdate });

    return {
      result: {},
    };
  }
}
