import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { Logger } from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import { ContainerDependencies } from "../container";
import * as db from "../../config/db";
import { UserModel } from "../app/features/users/models/user.model";
// MODELS_IMPORTS

export async function registerDatabase(container: AwilixContainer, dependencies?: ContainerDependencies) {
  const dbConnection = dependencies?.connection || (await createConnection(db as ConnectionOptions));

  try {
    await dbConnection.runMigrations();
  } catch (err) {
    (container.resolve("logger") as Logger).debug(`Migrations: ${err}`);
  }
  container.register({
    dbConnection: awilix.asValue(dbConnection),
    userRepository: awilix.asValue(dbConnection.getRepository(UserModel)),
    // MODELS_SETUP
  });
}
