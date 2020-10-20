import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { asArray } from "../shared/awilix-resolvers";


import LoginCommandHandler from "../app/features/users/handlers/login.handler";
import RegisterCommandHandler from "../app/features/users/handlers/register.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      awilix.asClass(LoginCommandHandler),
      awilix.asClass(RegisterCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
