import { UserBaseModel } from "./user-base.model";


export function createUserBaseDTO(user: UserBaseModel) {
    const {password, ...rest} = user;
    return rest;
}

// @todo
// export type UserBaseDTO = typeof createUserBaseDTO;
