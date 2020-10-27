import { Command } from "../../../../shared/command-bus";

export const REGISTER_MANAGER_COMMAND_TYPE = "users/REGISTER_MANAGER";

export interface RegisterManagerCommandPayload {
  email: string;
  password: string;
}

export class RegisterManagerCommand implements Command<RegisterManagerCommandPayload> {
  public type: string = REGISTER_MANAGER_COMMAND_TYPE;

  constructor(public payload: RegisterManagerCommandPayload) {}
}
