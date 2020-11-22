import * as inquirer from 'inquirer';
import { CommandBus } from "../../src/shared";

enum Choices {
  INVITE_MANAGER = 'Invite manager',
  SELECT_MANAGER = 'Select manager'
}
const choicesValues = Object.values(Choices);

interface CommandLineInterfaceDependencies {
  commandBus: CommandBus;
}

export class CommandLineInterface{
  constructor(private dependencies: CommandLineInterfaceDependencies){}

  async run(){
    try {
      const {choice} = await this.getChoice();
      await this.route(choice);
    } catch(e){
      console.log(e);
    }
  }

  private async getChoice(){
    return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What do you want to do?',
        choices: choicesValues,
      },
    ]);
  }

  private async route(choice: Choices){
    switch (choice) {
      case Choices.INVITE_MANAGER:
        return;
      case Choices.SELECT_MANAGER:
        return;
      default:
        throw new Error("Unknown action")
    };
  }
}
