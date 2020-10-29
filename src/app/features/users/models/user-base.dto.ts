import { UserBaseModel } from "./user-base.model";

export function createUserBaseDTO(user: UserBaseModel) {
  // eslint-disable-next-line
  const { id, type } = user;
  return {id, type};
}

export type UserBaseDTO = ReturnType<typeof createUserBaseDTO>;
