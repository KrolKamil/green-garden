import { v4 as uuid } from "uuid";
import { AwilixContainer } from "awilix";
import { GardenRepository } from "../../src/app/features/users/repositories/garden.repository";
import { GardenModel } from "../../src/app/features/gardens/models/garden.model";

interface SeedGardensConfig {
  gardensAmount: number;
}

export async function seedGardens(container: AwilixContainer<any>, config: SeedGardensConfig) {
  const { gardensAmount } = config;

  const gardenRepository: GardenRepository = container.resolve('gardenRepository');

  const gardens: GardenModel[] = [];

  for(let i=0; i<gardensAmount; i++){
    gardens.push(GardenModel.create({
        id: uuid(),
        publicId: uuid(),
        surfaceInSquareMeters: i
    }));
  }
  return gardenRepository.save(gardens);
}
