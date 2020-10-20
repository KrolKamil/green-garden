import { Repository, EntityRepository } from "typeorm";
import { UserBaseModel } from "../models/user-base.model";

@EntityRepository(UserBaseModel)
export class UserBaseRepository extends Repository<UserBaseModel> {
}
