// eslint-disable-next-line
import * as awilix from "awilix";
import { AwilixContainer } from "awilix";
import { asArray } from "../shared/awilix-resolvers";

import ListQueryHandler from "../app/features/users/query-handlers/list.query.handler";
import MeQueryHandler from "../app/features/users/query-handlers/me.query.handler";
import DetailsQueryHandler from "../app/features/users/query-handlers/details.query.handler";
import GardenListQueryHandler from "../app/features/gardens/query-handlers/garden-list.query.handler";
import MyGardensQueryHandler from "../app/features/gardens/query-handlers/my-gardens.query.handler";
import GardenDetailsQueryHandler from "../app/features/gardens/query-handlers/garden-details.query.handler";
import AssignedGardensQueryHandler from "../app/features/users/query-handlers/assigned-gardens.query.handler";
import AssignedUserQueryHandler from "../app/features/gardens/query-handlers/assigned-user.query.handler";
import PendingUserQueryHandler from "../app/features/users/query-handlers/pending-user.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      awilix.asClass(ListQueryHandler),
      awilix.asClass(MeQueryHandler),
      awilix.asClass(DetailsQueryHandler),
      awilix.asClass(GardenListQueryHandler),
      awilix.asClass(MyGardensQueryHandler),
      awilix.asClass(GardenDetailsQueryHandler),
      awilix.asClass(AssignedGardensQueryHandler),
      awilix.asClass(AssignedUserQueryHandler),
      awilix.asClass(PendingUserQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
