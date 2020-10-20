import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { UserBaseRepository } from "../app/features/users/repositories/user-base.repository";

export async function registerRepositories(container: AwilixContainer) {
  container.register({
    user: awilix.asClass(UserBaseRepository),
  });

  return container;
}
