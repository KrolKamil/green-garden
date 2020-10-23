import {v4 as uuid} from 'uuid';
import { UserBaseRepository } from "../repositories/user-base.repository";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";
import { HashService } from "../../../../app/services/hash.service";
import { UserBaseModel, UserBaseType } from "../models/user-base.model";
import { WorkspaceRepository } from '../repositories/workspace.repository';
import { WorkspaceModel } from '../../workspace/models/workspace.model';
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_MANAGER_COMMAND_TYPE, RegisterManagerCommand } from "../commands/register-manager.command";


export interface RegisterManagerHandlerDependencies {
  workspaceRepository: WorkspaceRepository;
  userBaseRepository: UserBaseRepository;
  hashService: HashService;
}

export default class RegisterManagerHandler implements CommandHandler<RegisterManagerCommand> {
  public commandType: string = REGISTER_MANAGER_COMMAND_TYPE;
  
  constructor(private dependencies: RegisterManagerHandlerDependencies) {}

  async execute(command: RegisterManagerCommand) {
    const {workspaceRepository,userBaseRepository, hashService} = this.dependencies;
    const {email, password, workspaceName} = command.payload;

    const existingUser = await userBaseRepository.findOne({email, type: UserBaseType.MANAGER});
    if(existingUser) {
      throw new HttpError('Email is occupied', BAD_REQUEST);
    }

    const existingWorkspace = await workspaceRepository.findOne({name: workspaceName});
    if(existingWorkspace){
      throw new HttpError('Workspace name is occupied', BAD_REQUEST);
    }

    const workspace = await workspaceRepository
    .save(WorkspaceModel.create({
      id: uuid(),
      name: workspaceName
    }));

    const hashedPassword = await hashService.hash(password);

    await userBaseRepository.save(UserBaseModel.create({
      id: uuid(),
      email,
      password: hashedPassword,
      type: UserBaseType.MANAGER,
      workspace
    }));

    return {
      result: command
    }
  };
}
