import {v4 as uuid} from 'uuid';
import { CommandHandler } from "../../../../shared/command-bus";
import { INVITE_USER_COMMAND_TYPE, InviteUserCommand } from "../commands/invite-user.command";
import { Repository } from "typeorm";
import { PendingUserModel } from "../models/pending-user.model";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";
import { MailService } from "../../../../../src/app/services/mail.service";


export interface InviteUserHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  pendingUserRepository: Repository<PendingUserModel>;
  mailService: MailService;
}

export default class InviteUserHandler implements CommandHandler<InviteUserCommand> {
  public commandType: string = INVITE_USER_COMMAND_TYPE;
  
  constructor(private dependencies: InviteUserHandlerDependencies) {}

  async execute(command: InviteUserCommand) {
    const {userBaseRepository, mailService} = this.dependencies;
    const {email} = command.payload;

    const userExists = await userBaseRepository.findOne({email, type: UserBaseType.USER });
    if(userExists){
      throw new HttpError('Email is occupied', BAD_REQUEST)
    }

    const pendingUser = await this.findPendingUser(email) || await this.createPendingUser(email);
    await mailService.sendInviteMail(pendingUser.email, pendingUser.id);

    return {}
  };

  private findPendingUser(email: string){
    const {pendingUserRepository} = this.dependencies;
    return pendingUserRepository.findOne({email, type: UserBaseType.USER})
  }

  private createPendingUser(email: string){
    const {pendingUserRepository} = this.dependencies;
    return pendingUserRepository.save(PendingUserModel.create({
      id: uuid(),
      email,
      type: UserBaseType.USER
    }))
  }
}