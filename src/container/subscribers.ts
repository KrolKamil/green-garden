// eslint-disable-next-line
import * as awilix from "awilix";
import { AwilixContainer } from "awilix";
import { asArray } from "../shared/awilix-resolvers";

// SUBSCRIBERS_IMPORTS

export async function registerSubscribers(container: AwilixContainer) {
  container.register({
    eventSubscribers: asArray<any>([
      // SUBSCRIBERS_SETUP
    ]),
  });

  return container;
}
