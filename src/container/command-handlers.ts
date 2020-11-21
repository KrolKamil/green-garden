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
import EditGardenCommandHandler from "../app/features/gardens/handlers/edit-garden.handler";
import AssignGardenCommandHandler from "../app/features/gardens/handlers/assign-garden.handler";
import UnassignGardenCommandHandler from "../app/features/gardens/handlers/unassign-garden.handler";
import GardenSetActiveCommandHandler from "../app/features/gardens/handlers/garden-set-active.handler";
import GardenSetNoteCommandHandler from "../app/features/gardens/handlers/garden-set-note.handler";
import InviteUserCommandHandler from "../app/features/users/handlers/invite-user.handler";
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
      awilix.asClass(EditGardenCommandHandler),
      awilix.asClass(AssignGardenCommandHandler),
      awilix.asClass(UnassignGardenCommandHandler),
      awilix.asClass(GardenSetActiveCommandHandler),
      awilix.asClass(GardenSetNoteCommandHandler),
      awilix.asClass(InviteUserCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
