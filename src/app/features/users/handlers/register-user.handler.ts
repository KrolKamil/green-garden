import { v4 as uuid } from "uuid";
import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_USER_COMMAND_TYPE, RegisterUserCommand } from "../commands/register-user.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../errors/http.error";
import { HashService } from "../../../services/hash.service";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";
import { WorkspaceRepository } from "../repositories/workspace.repository";

export interface RegisterUserHandlerDependencies {
  workspaceRepository: WorkspaceRepository;
  userBaseRepository: UserBaseRepository;
  hashService: HashService;
}

export default class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  public commandType: string = REGISTER_USER_COMMAND_TYPE;

  constructor(private dependencies: RegisterUserHandlerDependencies) {}

  async execute(command: RegisterUserCommand) {
    const { workspaceRepository, userBaseRepository, hashService } = this.dependencies;
    const { email, password, workspaceId } = command.payload;
    const existingWorkspace = await workspaceRepository.findOne({ id: workspaceId });
    if (!existingWorkspace) throw new HttpError("Invalid workspace id", BAD_REQUEST);

    const existingUser = await userBaseRepository.findOne({
      email,
      type: UserBaseType.USER,
      workspace: existingWorkspace,
    });
    if (existingUser) throw new HttpError("Email is occupied", BAD_REQUEST);

    const hashedPassword = await hashService.hash(password);

    await userBaseRepository.save(
      UserBaseModel.create({
        id: uuid(),
        email,
        password: hashedPassword,
        type: UserBaseType.USER,
        workspace: existingWorkspace,
      }),
    );

    return {
      result: command,
    };
  }
}
