import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { HashService } from "../app/services/hash.service";
import { TokenService } from "../app/services/token.service";

export async function registerServices(container: AwilixContainer) {
  container.register({
    hashService: awilix.asClass(HashService),
    tokenService: awilix.asClass(TokenService),
  });

  return container;
}
