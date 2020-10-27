import { v4 as uuid } from "uuid";
import { AwilixContainer } from "awilix";
import { UserBaseModel, UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { HashService } from "../../src/app/services/hash.service";

interface SeedUsersConfig {
  usersAmount: number;
}

export async function seedUsers(container: AwilixContainer<any>, config: SeedUsersConfig) {
  const { usersAmount } = config;
  const userBaseRepository: UserBaseRepository = container.resolve("userBaseRepository");
  const hashService: HashService = container.resolve("hashService");
  const users: UserBaseModel[] = [];

  const hashedPassword = await hashService.hash("123456");

  users.push(
    UserBaseModel.create({
      id: uuid(),
      email: "manager@test.com",
      password: hashedPassword,
      type: UserBaseType.MANAGER,
    }),
  );
  // eslint-disable-next-line
    for (let i = 0; i < usersAmount; i++) {
    users.push(
      UserBaseModel.create({
        id: uuid(),
        email: `user+${i}@test.com`,
        password: hashedPassword,
        type: UserBaseType.USER,
      }),
    );
  }

  return userBaseRepository.save(users);
}
