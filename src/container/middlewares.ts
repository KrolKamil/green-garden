import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { errorHandler } from "../middleware/error-handler";
import { makeAuthenticationMiddleware } from "../middleware/authentication";
import { makeCreateAuthorizationMiddleware } from "../middleware/authorization";

export async function registerMiddlewares(container: AwilixContainer) {
  container.register({
    errorHandler: awilix.asFunction(errorHandler),
    authenticationMiddleware: awilix.asFunction(makeAuthenticationMiddleware),
    createAuthorizationMiddleware: awilix.asFunction(makeCreateAuthorizationMiddleware),
  });

  return container;
}
