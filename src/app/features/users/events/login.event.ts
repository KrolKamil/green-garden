import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { LoginCommandPayload } from "../commands/login.command";

export default class LoginEvent implements Event {
    static eventName: string = "Login";
    public payload: Command<LoginCommandPayload>;
    
    get name() {
        return LoginEvent.eventName;
    }

    public constructor(command: Command<LoginCommandPayload>) {
        this.payload = command;
    }
  }