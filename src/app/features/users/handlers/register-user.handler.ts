import { v4 as uuid } from "uuid";
import { CONFLICT } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_USER_COMMAND_TYPE, RegisterUserCommand } from "../commands/register-user.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../errors/http.error";
import { HashService } from "../../../services/hash.service";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";

export interface RegisterUserHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  hashService: HashService;
}

export default class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  public commandType: string = REGISTER_USER_COMMAND_TYPE;

  constructor(private dependencies: RegisterUserHandlerDependencies) {}

  async execute(command: RegisterUserCommand) {
    const { userBaseRepository, hashService } = this.dependencies;
    const { email, password } = command.payload;

    const existingUser = await userBaseRepository.findOne({
      email,
      type: UserBaseType.USER,
    });
    if (existingUser) throw new HttpError("Email is occupied", CONFLICT);

    const hashedPassword = await hashService.hash(password);

    await userBaseRepository.save(
      UserBaseModel.create({
        id: uuid(),
        email,
        password: hashedPassword,
        type: UserBaseType.USER,
        active: true,
      }),
    );

    return {
      result: command,
    };
  }
}
