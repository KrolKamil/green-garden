import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { HashService } from "../app/services/hash.service";

export async function registerServices(container: AwilixContainer) {
  container.register({
    hashService: awilix.asClass(HashService),
  });

  return container;
}
