import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { asArray } from "../shared/awilix-resolvers";

import LoginCommandHandler from "../app/features/users/handlers/login.handler";
// import RegisterCommandHandler from "../app/features/users/handlers/register.handler";
import RegisterUserCommandHandler from "../app/features/users/handlers/register-user.handler";
import RegisterManagerCommandHandler from "../app/features/users/handlers/register-manager.handler";
import RefreshAccessTokenCommandHandler from "../app/features/users/handlers/refresh-access-token.handler";
import UpdateCommandHandler from "../app/features/users/handlers/update.handler";
import SetNoteCommandHandler from "../app/features/users/handlers/set-note.handler";
import SetActiveCommandHandler from "../app/features/users/handlers/set-active.handler";
import CreateGardenCommandHandler from "../app/features/gardens/handlers/create-garden.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      awilix.asClass(LoginCommandHandler),
      // awilix.asClass(RegisterCommandHandler),
      awilix.asClass(RegisterUserCommandHandler),
      awilix.asClass(RegisterManagerCommandHandler),
      awilix.asClass(RefreshAccessTokenCommandHandler),
      awilix.asClass(UpdateCommandHandler),
      awilix.asClass(SetNoteCommandHandler),
      awilix.asClass(SetActiveCommandHandler),
      awilix.asClass(CreateGardenCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
