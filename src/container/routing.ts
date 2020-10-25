import { AwilixContainer, Lifetime } from "awilix";
import * as awilix from "awilix";

import { usersRouting } from "../app/features/users/routing";
import { workspaceRouting } from "../app/features/workspace/routing";
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
    workspaceRouting: awilix.asFunction(workspaceRouting),
    // ROUTING_SETUP
  });

  return container;
}
