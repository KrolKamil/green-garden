import { v4 as uuid } from "uuid";
import { BAD_REQUEST } from "http-status-codes";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../errors/http.error";
import { HashService } from "../../../services/hash.service";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_MANAGER_COMMAND_TYPE, RegisterManagerCommand } from "../commands/register-manager.command";

export interface RegisterManagerHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  hashService: HashService;
}

export default class RegisterManagerHandler implements CommandHandler<RegisterManagerCommand> {
  public commandType: string = REGISTER_MANAGER_COMMAND_TYPE;

  constructor(private dependencies: RegisterManagerHandlerDependencies) {}

  async execute(command: RegisterManagerCommand) {
    const { userBaseRepository, hashService } = this.dependencies;
    const { email, password } = command.payload;

    const existingUser = await userBaseRepository.findOne({ email, type: UserBaseType.MANAGER });
    if (existingUser) {
      throw new HttpError("Email is occupied", BAD_REQUEST);
    }

    const hashedPassword = await hashService.hash(password);

    await userBaseRepository.save(
      UserBaseModel.create({
        id: uuid(),
        email,
        password: hashedPassword,
        type: UserBaseType.MANAGER,
        active: false
      }),
    );

    return {
      result: command,
    };
  }
}
