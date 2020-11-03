import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { SET_ACTIVE_COMMAND_TYPE, SetActiveCommand } from "../commands/set-active.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";
import { HttpError } from "../../../../errors/http.error";

export interface SetActiveHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class SetActiveHandler implements CommandHandler<SetActiveCommand> {
  public commandType: string = SET_ACTIVE_COMMAND_TYPE;

  constructor(private dependencies: SetActiveHandlerDependencies) {}

  async execute(command: SetActiveCommand) {
    const { userBaseRepository } = this.dependencies;
    const { userId, active } = command.payload;

    const result = await userBaseRepository.update({ id: userId, type: UserBaseType.USER }, { active });

    if (result.affected === 0) {
      throw new HttpError("Invalid userId", BAD_REQUEST);
    }

    return {};
  }
}
