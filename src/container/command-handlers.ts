import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { asArray } from "../shared/awilix-resolvers";

import LoginCommandHandler from "../app/features/users/handlers/login.handler";
// import RegisterCommandHandler from "../app/features/users/handlers/register.handler";
import RegisterUserCommandHandler from "../app/features/users/handlers/register-user.handler";
import RegisterManagerCommandHandler from "../app/features/users/handlers/register-manager.handler";
import RefreshAccessTokenCommandHandler from "../app/features/users/handlers/refresh-access-token.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      awilix.asClass(LoginCommandHandler),
      // awilix.asClass(RegisterCommandHandler),
      awilix.asClass(RegisterUserCommandHandler),
      awilix.asClass(RegisterManagerCommandHandler),
      awilix.asClass(RefreshAccessTokenCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
