import {v4 as uuid} from 'uuid';
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_COMMAND_TYPE, RegisterCommand } from "../commands/register.command";
import { Repository } from "typeorm";
import { PendingUserModel } from "../models/pending-user.model";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";

export interface RegisterHandlerDependencies {
  pendingUserRepository: Repository<PendingUserModel>
  userBaseRepository: UserBaseRepository;
}

export default class RegisterHandler implements CommandHandler<RegisterCommand> {
  public commandType: string = REGISTER_COMMAND_TYPE;
  
  constructor(private dependencies: RegisterHandlerDependencies) {}

  async execute(command: RegisterCommand) {
    const {pendingUserRepository, userBaseRepository} = this.dependencies
    const {userId, password} = command.payload;

    const pendingUser = await pendingUserRepository.findOne(userId);
    if(!pendingUser){
      throw new HttpError('Invalid user id', BAD_REQUEST)
    }

    const {email, type} = pendingUser;
    await pendingUserRepository.delete({id: pendingUser.id});

    await userBaseRepository.save(UserBaseModel.create({
      id: uuid(),
      email,
      password,
      type,
      active: type === UserBaseType.USER,
    }))

    return {}
  };
}
