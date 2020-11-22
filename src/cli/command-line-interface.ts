import * as inquirer from 'inquirer';
import { CommandBus } from "../../src/shared";
import { InviteManagerCommand } from '../../src/app/features/users/commands/invite-manager.command';

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
      console.log('Success');
    } catch(e){
      console.log('Error:');
      console.log(e.message);
    }
    finally{
      process.exit();
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
        return this.inviteManager();
      case Choices.SELECT_MANAGER:
        return;
      default:
        throw new Error("Unknown action")
    };
  }

  private async inviteManager(){
    const {email} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Insert manager email',
      },
    ]);
    return this.dependencies.commandBus.execute(
      new InviteManagerCommand({
        email
      })
    )
  }
}
