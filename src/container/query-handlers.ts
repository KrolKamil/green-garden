// eslint-disable-next-line
import * as awilix from "awilix";
import { AwilixContainer } from "awilix";
import { asArray } from "../shared/awilix-resolvers";

import DetailsQueryHandler from "../app/features/users/query-handlers/details.query.handler";
import ListQueryHandler from "../app/features/users/query-handlers/list.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      awilix.asClass(DetailsQueryHandler),
      awilix.asClass(ListQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
