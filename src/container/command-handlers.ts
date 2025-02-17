import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { asArray } from "../shared/awilix-resolvers";

import LoginCommandHandler from "../app/features/users/handlers/login.handler";
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
import RegisterCommandHandler from "../app/features/users/handlers/register.handler";
import InviteManagerCommandHandler from "../app/features/users/handlers/invite-manager.handler";
import PublishNoticeCommandHandler from "../app/features/notice/handlers/publish-notice.handler";
import EditNoticeCommandHandler from "../app/features/notice/handlers/edit-notice.handler";
import DeleteNoticeCommandHandler from "../app/features/notice/handlers/delete-notice.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      awilix.asClass(LoginCommandHandler),
      awilix.asClass(RegisterCommandHandler),
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
      awilix.asClass(InviteManagerCommandHandler),
      awilix.asClass(PublishNoticeCommandHandler),
      awilix.asClass(EditNoticeCommandHandler),
      awilix.asClass(DeleteNoticeCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
