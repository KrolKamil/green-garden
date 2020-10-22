import { AwilixContainer, asClass } from "awilix";
import * as awilix from "awilix";
import { Logger } from "winston";
import { createConnection, ConnectionOptions } from "typeorm";
import { ContainerDependencies } from "../container";
import * as db from "../../config/db";
import { UserBaseModel } from "../app/features/users/models/user-base.model";
import { WorkspaceModel } from "../app/features/workspace/models/workspace.model";
import { UserBaseRepository } from "../app/features/users/repositories/user-base.repository";
import { WorkspaceRepository } from "../app/features/users/repositories/workspace.repository";
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
    userBaseRepository: awilix.asValue(dbConnection.getRepository(UserBaseModel)),
    workspaceRepository: awilix.asValue(dbConnection.getRepository(WorkspaceModel)),
    // MODELS_SETUP
  });
  container.register({
    userBaseRepository: awilix.asValue(dbConnection.getCustomRepository(UserBaseRepository)),
    workspaceRepository: awilix.asValue(dbConnection.getCustomRepository(WorkspaceRepository)),
  })
}
