import { Repository, EntityRepository } from "typeorm";
import { UserBaseModel } from "../models/user-base.model";

@EntityRepository(UserBaseModel)
export class UserBaseRepository extends Repository<UserBaseModel> {
  async setNewManager(userId: string) {
    return this.manager.transaction(async (transaction) => {
      await transaction.update(UserBaseModel, {}, { active: false });
      await transaction.update(UserBaseModel, { id: userId }, { active: true });
    });
  }
}
