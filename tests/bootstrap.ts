import "mocha";
import { use } from "chai";
import * as path from "path";
import * as chaiAsPromised from "chai-as-promised";
import { config as dotenvConfig } from "dotenv-safe";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { createContainer } from "../src/container";
import * as db from "../config/db";
import { UserBaseModel } from "../src/app/features/users/models/user-base.model";

use(chaiAsPromised);

dotenvConfig({
  allowEmptyValues: true,
  example: path.resolve(__dirname, "./../../.env.test"),
});

const clearDb = async (connection: Connection) => {
  await connection.getRepository(UserBaseModel).delete({});
};

before(async () => {
  const dbConnection = await createConnection({
    name: "integration-tests-connection",
    ...(db as ConnectionOptions),
    logging: false,
  });

  global.dbConnection = dbConnection;
  await dbConnection.dropDatabase();

  global.container = await createContainer();
});

beforeEach(async () => {
  if (global.dbConnection) {
    await clearDb(global.dbConnection);
  }
});

after(async () => {
  if (global.dbConnection) {
    await global.dbConnection.close();
  }
});
