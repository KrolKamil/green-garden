// eslint-disable-next-line
import * as awilix from "awilix";
import { AwilixContainer } from "awilix";
import { asArray } from "../shared/awilix-resolvers";

// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
