import { Command } from "../../../../shared/command-bus";

export const REGISTER_COMMAND_TYPE = "users/REGISTER";

export interface RegisterCommandPayload {
  email: string;
  password: string;
  workspace?: string;
}

export class RegisterCommand implements Command<RegisterCommandPayload> {
  public type: string = REGISTER_COMMAND_TYPE;

  constructor(public payload: RegisterCommandPayload) {}
}
