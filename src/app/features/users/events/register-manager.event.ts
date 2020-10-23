import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { RegisterManagerCommandPayload } from "../commands/register-manager.command";

export default class RegisterManagerEvent implements Event {
    static eventName: string = "RegisterManager";
    public payload: Command<RegisterManagerCommandPayload>;
    
    get name() {
        return RegisterManagerEvent.eventName;
    }

    public constructor(command: Command<RegisterManagerCommandPayload>) {
        this.payload = command;
    }
  }