import { AwilixContainer, Lifetime } from "awilix";
import * as awilix from "awilix";

import { usersRouting } from "../app/features/users/routing";
import { gardensRouting } from "../app/features/gardens/routing";
import { noticeRouting } from "../app/features/notice/routing";
// ROUTING_IMPORTS

export async function registerRouting(container: AwilixContainer) {
  container.loadModules(["src/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: awilix.asClass,
    },
  });

  container.register({
    usersRouting: awilix.asFunction(usersRouting),
    gardensRouting: awilix.asFunction(gardensRouting),
    noticeRouting: awilix.asFunction(noticeRouting),
  // ROUTING_SETUP
  });

  return container;
}
