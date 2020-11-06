import { AwilixContainer } from "awilix";
import { seedUsers } from "./seed-users";
import {seedGardens} from './seed-gardens';
import { GardenModel } from "../../src/app/features/gardens/models/garden.model";

type SeedConfig = {
  usersAmount: number;
  gardensAmount?: number;
};

export async function seedApplication(container: AwilixContainer<any>, config: SeedConfig) {
  const { usersAmount, gardensAmount } = config;
  const users = await seedUsers(container, {
    usersAmount,
  });

  let gardens;

  if(gardensAmount){
    gardens = await seedGardens(container, {gardensAmount})
  }

  return {
    users,
    gardens
  };
}
