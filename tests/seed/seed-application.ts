import { AwilixContainer } from "awilix";
import { seedUsers } from "./seed-users";
import { seedWorkspaces } from "./seed-workspaces";

type SeedConfig = {
  workspacesAmount: number;
  usersAmount: number;
};

export async function seedApplication(container: AwilixContainer<any>, config: SeedConfig) {
  const { workspacesAmount, usersAmount } = config;
  const workspaces = await seedWorkspaces(container, { workspacesAmount });
  const users = await seedUsers(container, {
    usersAmount,
    workspaces,
  });

  return {
    workspaces,
    users,
  };
}
