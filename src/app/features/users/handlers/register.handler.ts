import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_COMMAND_TYPE, RegisterCommand } from "../commands/register.command";
import { PendingUserModel } from "../models/pending-user.model";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../errors/http.error";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";
import { HashService } from "../../../services/hash.service";

export interface RegisterHandlerDependencies {
  pendingUserRepository: Repository<PendingUserModel>;
  userBaseRepository: UserBaseRepository;
  hashService: HashService;
}

export default class RegisterHandler implements CommandHandler<RegisterCommand> {
  public commandType: string = REGISTER_COMMAND_TYPE;

  constructor(private dependencies: RegisterHandlerDependencies) {}

  async execute(command: RegisterCommand) {
    const { pendingUserRepository, userBaseRepository, hashService } = this.dependencies;
    const { userId, password, name, surname, phone } = command.payload;

    const pendingUser = await pendingUserRepository.findOne(userId);
    if (!pendingUser) {
      throw new HttpError("Invalid user id", BAD_REQUEST);
    }

    const { email, type } = pendingUser;
    await pendingUserRepository.delete({ id: pendingUser.id });

    const hashedPassword = await hashService.hash(password);

    await userBaseRepository.save(
      UserBaseModel.create({
        id: uuid(),
        email,
        name,
        surname,
        password: hashedPassword,
        phone,
        type,
        active: true,
      }),
    );

    return {};
  }
}
