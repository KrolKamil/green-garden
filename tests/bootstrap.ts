import "mocha";
import { use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { createContainer } from "../src/container";
import * as db from "../config/db";
import { UserBaseModel } from "../src/app/features/users/models/user-base.model";
import { UserNoteModel } from "../src/app/features/users/models/user-note.model";
import { GardenModel } from "../src/app/features/gardens/models/garden.model";
import { AssignedGardensModel } from "../src/app/features/gardens/models/assigned-gardens.model";
import { PendingUserModel } from "../src/app/features/users/models/pending-user.model";
import { NoticeModel } from "../src/app/features/notice/models/notice.model";

use(chaiAsPromised);

const clearDb = async (connection: Connection) => {
  await connection.getRepository(NoticeModel).delete({});
  await connection.getRepository(AssignedGardensModel).delete({});
  await connection.getRepository(UserBaseModel).delete({});
  await connection.getRepository(UserNoteModel).delete({});
  await connection.getRepository(GardenModel).delete({});
  await connection.getRepository(PendingUserModel).delete({});
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
