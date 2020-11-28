import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from "http-status-codes";
import { QueryHandler } from "../../../../shared/query-bus";
import {
  GARDEN_DETAILS_QUERY_TYPE,
  GardenDetailsQuery,
  GardenDetailsQueryResult,
  GardenDetailsQueryPayload,
} from "../queries/garden-details";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { UserBaseType } from "../../users/models/user-base.model";
import { HttpError } from "../../../../errors/http.error";
import { GardenModel } from "../models/garden.model";

interface GardenDetailsQueryHandlerDependencies {
  gardenRepository: GardenRepository;
}

export default class GardenDetailsQueryHandler implements QueryHandler<GardenDetailsQuery, GardenDetailsQueryResult> {
  public queryType: string = GARDEN_DETAILS_QUERY_TYPE;

  constructor(private dependencies: GardenDetailsQueryHandlerDependencies) {}

  async execute(query: GardenDetailsQuery): Promise<GardenDetailsQueryResult> {
    const { userDTO } = query.payload;

    switch (userDTO.type) {
      case UserBaseType.USER:
        return new GardenDetailsQueryResult(await this.getGardensAsUser(query.payload));
      case UserBaseType.MANAGER:
        return new GardenDetailsQueryResult(await this.getGardensAsManager(query.payload));
      default:
        throw new HttpError("Unknown error", INTERNAL_SERVER_ERROR);
    }
  }

  private async getGardensAsUser(props: GardenDetailsQueryPayload) {
    const { gardenRepository } = this.dependencies;
    const { gardenId, userDTO } = props;

    const garden = await gardenRepository
      .createQueryBuilder("garden")
      .leftJoin("garden.assignedGardens", "ag")
      .leftJoin("ag.userBase", "ub")
      .where("garden.id=:gardenId", { gardenId })
      .andWhere("ub.id=:userId", { userId: userDTO.id })
      .andWhere("ag.unassigned_at is null")
      .getOne();

    if (!garden) {
      throw new HttpError("No records found", BAD_REQUEST);
    }

    return garden;
  }

  private async getGardensAsManager(props: GardenDetailsQueryPayload) {
    const { gardenRepository } = this.dependencies;
    const { gardenId } = props;

    const garden = await gardenRepository
      .createQueryBuilder("garden")
      .leftJoinAndSelect("garden.gardenNote", "gn")
      .leftJoinAndSelect("garden.assignedGardens", "ag")
      .leftJoinAndSelect("ag.userBase", "ub")
      .where("garden.id=:gardenId", { gardenId })
      .getOne();

    if (!garden) {
      throw new HttpError("No records found", BAD_REQUEST);
    }

    return this.getGardensAsManagerDTO(garden);
  }

  private getGardensAsManagerDTO(garden: GardenModel) {
    const { assignedGardens, ...rest } = garden;
    const assignedGardenWithCurrentGardenOwner = assignedGardens.find(
      (assignedGarden) => assignedGarden.unassignedAt === null,
    );
    return {
      ...rest,
      assignedUser: assignedGardenWithCurrentGardenOwner ? assignedGardenWithCurrentGardenOwner.userBase : null,
    };
  }
}
