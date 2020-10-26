import { AwilixContainer } from "awilix";
import { seedUsers } from "./seed-users";

type SeedConfig = {
  usersAmount: number;
};

export async function seedApplication(container: AwilixContainer<any>, config: SeedConfig) {
  const {  usersAmount } = config;
  const users = await seedUsers(container, {
    usersAmount,
  });

  return {
    users,
  };
}
