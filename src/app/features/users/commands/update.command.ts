import { Command } from "../../../../shared/command-bus";

export const UPDATE_COMMAND_TYPE = "users/UPDATE";

export interface UpdateCommandPayload {
  userId: string;
  name?: string;
  surname?: string;
  phone?: string;
}

export class UpdateCommand implements Command<UpdateCommandPayload> {
  public type: string = UPDATE_COMMAND_TYPE;

  constructor(public payload: UpdateCommandPayload) {}
}
