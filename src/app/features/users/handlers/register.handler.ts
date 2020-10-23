// import {v4 as uuid} from 'uuid';
// import { CommandHandler } from "../../../../shared/command-bus";
// import { REGISTER_COMMAND_TYPE, RegisterCommand, RegisterCommandPayload } from "../commands/register.command";
// import { UserBaseRepository } from "../repositories/user-base.repository";
// import { HttpError } from "../../../../../src/errors/http.error";
// import { BAD_REQUEST } from "http-status-codes";
// import { HashService } from "../../../../app/services/hash.service";
// import { UserBaseModel, UserBaseType } from "../models/user-base.model";
// import { WorkspaceRepository } from '../repositories/workspace.repository';
// import { WorkspaceModel } from '../../workspace/models/workspace.model';


// export interface RegisterHandlerDependencies {
//   workspaceRepository: WorkspaceRepository;
//   userBaseRepository: UserBaseRepository;
//   hashService: HashService;
// }

// export default class RegisterHandler implements CommandHandler<RegisterCommand> {
//   public commandType: string = REGISTER_COMMAND_TYPE;
  
//   constructor(private dependencies: RegisterHandlerDependencies) {}

//   private async registerUser(payload: RegisterCommandPayload){
//     const {workspaceRepository ,userBaseRepository, hashService} = this.dependencies;
//     const {email, password, workspace} = payload;
//     const existingWorkspace = await workspaceRepository.findOne({id: workspace});
//     if(!existingWorkspace)
//       throw new HttpError('Invalid workspace id', BAD_REQUEST);

//     const existingUser = await userBaseRepository.findOne({email, type: UserBaseType.USER, workspace: existingWorkspace});
//     if(existingUser)
//       throw new HttpError('Email is occupied', BAD_REQUEST);
      
//     const hashedPassword = await hashService.hash(password);

//     await userBaseRepository.save(UserBaseModel.create({
//       id: uuid(),
//       email,
//       password: hashedPassword,
//       type: UserBaseType.USER,
//       workspace: existingWorkspace
//     }))
//   }

//   private async registerManager(payload: RegisterCommandPayload) {
//     const {workspaceRepository,userBaseRepository, hashService} = this.dependencies;
//     const {email, password} = payload;
//     const existingUser = await userBaseRepository.findOne({email, type: UserBaseType.MANAGER});
//     if(existingUser)
//       throw new HttpError('Email is occupied', BAD_REQUEST);

//     const workspace = await workspaceRepository
//     .save(WorkspaceModel.create({
//       id: uuid()
//     }));

//     const hashedPassword = await hashService.hash(password);

//     await userBaseRepository.save(UserBaseModel.create({
//       id: uuid(),
//       email,
//       password: hashedPassword,
//       type: UserBaseType.MANAGER,
//       workspace
//     }));
//   }

//   async execute(command: RegisterCommand) {
    
//     command.payload.workspace ? await this.registerUser(command.payload) : await this.registerManager(command.payload)

//     return {
//       result: {}
//     }
//   };
// }
