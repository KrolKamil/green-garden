import { v4 as uuid } from "uuid";
import { Repository, getManager } from "typeorm";
import { CommandHandler } from "../../../../shared/command-bus";
import { GARDEN_SET_NOTE_COMMAND_TYPE, GardenSetNoteCommand } from "../commands/garden-set-note.command";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { GardenNoteModel } from "../models/garden-note.model";
import { HttpError } from "../../../../errors/http.error";

export interface GardenSetNoteHandlerDependencies {
  gardenRepository: GardenRepository;
  gardenNoteRepository: Repository<GardenNoteModel>;
}

export default class GardenSetNoteHandler implements CommandHandler<GardenSetNoteCommand> {
  public commandType: string = GARDEN_SET_NOTE_COMMAND_TYPE;

  constructor(private dependencies: GardenSetNoteHandlerDependencies) {}

  async execute(command: GardenSetNoteCommand) {
    const { gardenRepository, gardenNoteRepository } = this.dependencies;
    const { gardenId, content } = command.payload;

    const garden = await gardenRepository.findOne({
      where: { id: gardenId },
      relations: ["gardenNote"],
    });

    if (!garden) {
      throw new HttpError("Invalid gardenId", 400);
    }

    if (garden.gardenNote) {
      garden.gardenNote.content = content;
      await gardenNoteRepository.save(garden.gardenNote);
    } else {
      const gardenNote = GardenNoteModel.create({
        id: uuid(),
        content,
      });
      garden.gardenNote = gardenNote;

      await getManager().transaction(async (transaction) => {
        await transaction.save(gardenNote);
        await transaction.save(garden);
      });
    }

    return {};
  }
}
