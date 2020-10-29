import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";

describe("/users/update integration", () => {
  it("updates self details", async () => {
    const { users } = await seedApplication(global.container, {
      usersAmount: 1,
    });
    
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const {accessToken} = loginHelper(global.container, user);

    const toUpdate = {
        name: 'name',
        surname: 'surname',
        phone: '123',
      };

    await request(global.container.resolve("app"))
      .post("/api/users/update")
      .set('Authorization', `Bearer ${accessToken}`)
      .send(toUpdate)
      .expect(200)
      .then(async () => {
        const userBaseRepository: UserBaseRepository = global.container.resolve('userBaseRepository');
        const updatedUser = await userBaseRepository.findOneOrFail(user.id);
        const {name, surname, phone} = updatedUser;
        expect(name).to.be.equal(toUpdate.name);
        expect(surname).to.be.equal(toUpdate.surname);
        expect(phone).to.be.equal(toUpdate.phone);
    });

    return request(global.container.resolve("app"))
      .post("/api/users/update")
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'name2'
      })
      .expect(200)
      .then(async () => {
        const userBaseRepository: UserBaseRepository = global.container.resolve('userBaseRepository');
        const updatedUser = await userBaseRepository.findOneOrFail(user.id);
        const {name, surname, phone} = updatedUser;
        expect(name).to.be.equal('name2');
        expect(surname).to.be.equal(toUpdate.surname);
        expect(phone).to.be.equal(toUpdate.phone);
    });
  });
});
