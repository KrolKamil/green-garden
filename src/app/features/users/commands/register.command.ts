import { Command } from "../../../../shared/command-bus";

export const REGISTER_COMMAND_TYPE = "users/REGISTER";

export interface RegisterCommandPayload {
  userId: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
}

export class RegisterCommand implements Command<RegisterCommandPayload> {
  public type: string = REGISTER_COMMAND_TYPE;

  constructor(public payload: RegisterCommandPayload) {}
}
