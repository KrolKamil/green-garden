/* eslint-disable no-console */
import * as inquirer from "inquirer";
import { CommandBus } from "../shared";
import { InviteManagerCommand } from "../app/features/users/commands/invite-manager.command";
import { UserBaseRepository } from "../app/features/users/repositories/user-base.repository";
import { UserBaseType, UserBaseModel } from "../app/features/users/models/user-base.model";

enum Choices {
  INVITE_MANAGER = "Invite manager",
  SELECT_MANAGER = "Select manager",
}
const choicesValues = Object.values(Choices);

interface CommandLineInterfaceDependencies {
  commandBus: CommandBus;
  userBaseRepository: UserBaseRepository;
}

export class CommandLineInterface {
  constructor(private dependencies: CommandLineInterfaceDependencies) {}

  async run() {
    try {
      const { choice } = await this.getChoice();
      await this.route(choice);
      console.log("Success");
    } catch (e) {
      console.log("Error:");
      console.log(e.message);
    } finally {
      process.exit();
    }
  }

  private async getChoice() {
    return inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: choicesValues,
      },
    ]);
  }

  private async route(choice: Choices) {
    switch (choice) {
      case Choices.INVITE_MANAGER:
        return this.inviteManager();
      case Choices.SELECT_MANAGER:
        return this.selectManager();
      default:
        throw new Error("Unknown action");
    }
  }

  private async inviteManager() {
    const { email } = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Insert manager email",
      },
    ]);
    return this.dependencies.commandBus.execute(
      new InviteManagerCommand({
        email,
      }),
    );
  }

  private async selectManager() {
    const { userBaseRepository } = this.dependencies;
    const allMenagers = await userBaseRepository.find({ type: UserBaseType.MANAGER });
    if (allMenagers.length === 0) {
      throw new Error("The system does not have any manager");
    }
    const managerChoices = this.createManagerChoices(allMenagers);
    console.log(managerChoices);
    const { managerId } = await inquirer.prompt([
      {
        type: "list",
        name: "managerId",
        message: "Select new manager",
        choices: managerChoices,
      },
    ]);
    await userBaseRepository.setNewManager(managerId);
  }

  private createManagerChoices(managers: UserBaseModel[]) {
    return managers.map((manager) => {
      return {
        name: manager.active ? `${manager.email}[active]` : manager.email,
        value: manager.id,
      };
    });
  }
}
