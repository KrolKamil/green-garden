import { CommandHandler } from "../../../../shared/command-bus";
import { EDIT_GARDEN_COMMAND_TYPE, EditGardenCommand } from "../commands/edit-garden.command";
import { GardenRepository } from "../../users/repositories/garden.repository";
import {deleteUndefinedProperties} from '../../../tools/delete-undefined-properties';


export interface EditGardenHandlerDependencies {
  gardenRepository: GardenRepository;
}

export default class EditGardenHandler implements CommandHandler<EditGardenCommand> {
  public commandType: string = EDIT_GARDEN_COMMAND_TYPE;
  
  constructor(private dependencies: EditGardenHandlerDependencies) {}

  async execute(command: EditGardenCommand) {
    const {gardenRepository} = this.dependencies;
    const {id, ...rest} = command.payload;
    const gardenFieldsToUpdate = deleteUndefinedProperties(rest)
    await gardenRepository.update({id}, {...gardenFieldsToUpdate});
    return {}
  };
}
