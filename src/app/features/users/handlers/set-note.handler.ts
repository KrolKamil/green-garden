import { v4 as uuid } from "uuid";
import { BAD_REQUEST } from "http-status-codes";
import { Repository, getManager } from "typeorm";
import { CommandHandler } from "../../../../shared/command-bus";
import { SET_NOTE_COMMAND_TYPE, SetNoteCommand } from "../commands/set-note.command";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";
import { HttpError } from "../../../../errors/http.error";
import { UserNoteModel } from "../models/user-note.model";

export interface SetNoteHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  userNoteRepository: Repository<UserNoteModel>;
}

export default class SetNoteHandler implements CommandHandler<SetNoteCommand> {
  public commandType: string = SET_NOTE_COMMAND_TYPE;

  constructor(private dependencies: SetNoteHandlerDependencies) {}

  async execute(command: SetNoteCommand) {
    const { userBaseRepository, userNoteRepository } = this.dependencies;
    const { userId, content } = command.payload;

    const user = await userBaseRepository.findOne({
      where: { id: userId, type: UserBaseType.USER },
      relations: ["userNote"],
    });

    if (!user) {
      throw new HttpError("Invalid userId", BAD_REQUEST);
    }

    if (user.userNote) {
      user.userNote.content = content;
      await userNoteRepository.save(user.userNote);
    } else {
      const userNote = UserNoteModel.create({
        id: uuid(),
        content,
      });
      user.userNote = userNote;

      await getManager().transaction(async (transaction) => {
        await transaction.save(userNote);
        await transaction.save(user);
      });
    }

    return {};
  }
}
