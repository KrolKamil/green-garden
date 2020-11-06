import { AwilixContainer } from "awilix";
import * as awilix from "awilix";
import { Logger } from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import { ContainerDependencies } from "../container";
import * as db from "../../config/db";
import { UserBaseRepository } from "../app/features/users/repositories/user-base.repository";
import { UserNoteModel } from "../app/features/users/models/user-note.model";
import { GardenRepository } from "../../src/app/features/users/repositories/garden.repository";
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
    userNoteRepository: awilix.asValue(dbConnection.getRepository(UserNoteModel)),
    // MODELS_SETUP
  });
  container.register({
    userBaseRepository: awilix.asValue(dbConnection.getCustomRepository(UserBaseRepository)),
    gardenRepository: awilix.asValue(dbConnection.getCustomRepository(GardenRepository)),
  });
}
