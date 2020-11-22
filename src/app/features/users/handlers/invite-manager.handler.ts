import {v4 as uuid} from 'uuid';
import { CommandHandler } from "../../../../shared/command-bus";
import { INVITE_MANAGER_COMMAND_TYPE, InviteManagerCommand } from "../commands/invite-manager.command";
import { PendingUserModel } from "../models/pending-user.model";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";
import { MailService } from "../../../../../src/app/services/mail.service";
import { Repository } from "typeorm";


export interface InviteManagerHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  pendingUserRepository: Repository<PendingUserModel>;
  mailService: MailService;
}

export default class InviteManagerHandler implements CommandHandler<InviteManagerCommand> {
  public commandType: string = INVITE_MANAGER_COMMAND_TYPE;
  
  constructor(private dependencies: InviteManagerHandlerDependencies) {}

  async execute(command: InviteManagerCommand) {
    const {userBaseRepository, mailService} = this.dependencies;
    const {email} = command.payload;

    const managerExists = await userBaseRepository.findOne({email, type: UserBaseType.MANAGER });
    if(managerExists){
      throw new Error('Email is occupied');
    }

    const pendingManager = await this.findPendingManager(email) || await this.createPendingManager(email);
    await mailService.sendInviteMail(pendingManager.email, pendingManager.id);

    return {}
  };

  private findPendingManager(email: string){
    const {pendingUserRepository} = this.dependencies;
    return pendingUserRepository.findOne({email, type: UserBaseType.MANAGER})
  }

  private createPendingManager(email: string){
    const {pendingUserRepository} = this.dependencies;
    return pendingUserRepository.save(PendingUserModel.create({
      id: uuid(),
      email,
      type: UserBaseType.MANAGER
    }))
  }
}
