import { UserBaseModel } from "./user-base.model";

export function createUserBaseDTO(user: UserBaseModel) {
  // eslint-disable-next-line
  const { password, ...rest } = user;
  return rest;
}

export type UserBaseDTO = ReturnType<typeof createUserBaseDTO>;
