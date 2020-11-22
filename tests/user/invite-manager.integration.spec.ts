import { expect } from "chai";
import "mocha";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";
import { CommandBus } from "../../src/shared";
import { InviteManagerCommand } from "../../src/app/features/users/commands/invite-manager.command";

describe("/users/invite-manager integration", () => {
  it("thows error when email is occupied", async () => {
    const commandBus: CommandBus = global.container.resolve("commandBus");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;

    await commandBus
      .execute(
        new InviteManagerCommand({
          email: manager.email,
        }),
      )
      .catch((err) => expect(err).to.be.instanceOf(Error));
  });
  it("creates pending manager and sends email", async () => {
    const commandBus: CommandBus = global.container.resolve("commandBus");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");

    const email = "new.user@test.com";
    await commandBus
      .execute(
        new InviteManagerCommand({
          email,
        }),
      )
      .then(async () => {
        const pendingUser = await pendingUserRepository.findOne({});
        expect(pendingUser?.email).to.be.equal(email);
        expect(pendingUser?.type).to.be.equal(UserBaseType.MANAGER);
      });
  });
  it("resends email", async () => {
    const commandBus: CommandBus = global.container.resolve("commandBus");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");

    const email = "new.user@test.com";
    await commandBus
      .execute(
        new InviteManagerCommand({
          email,
        }),
      )
      .then(async () => {
        const pendingUser = await pendingUserRepository.findOne({});
        expect(pendingUser?.email).to.be.equal(email);
        expect(pendingUser?.type).to.be.equal(UserBaseType.MANAGER);
      });

    await commandBus
      .execute(
        new InviteManagerCommand({
          email,
        }),
      )
      .then(async () => {
        const pendingUser = await pendingUserRepository.findOne({});
        expect(pendingUser?.email).to.be.equal(email);
        expect(pendingUser?.type).to.be.equal(UserBaseType.MANAGER);
        const pendingUserAmount = await pendingUserRepository.count();
        expect(pendingUserAmount).to.be.equal(1);
      });
  });
});
