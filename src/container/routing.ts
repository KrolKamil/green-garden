import { AwilixContainer, Lifetime } from "awilix";
import * as awilix from "awilix";

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
    // ROUTING_SETUP
  });

  return container;
}
