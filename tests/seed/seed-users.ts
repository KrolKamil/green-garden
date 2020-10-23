import {v4 as uuid} from 'uuid';
import { AwilixContainer } from "awilix";
import { WorkspaceModel } from "../../src/app/features/workspace/models/workspace.model";
import { UserBaseModel, UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { UserBaseRepository } from '../../src/app/features/users/repositories/user-base.repository';

interface SeedUsersConfig {
    usersAmount: number;
    workspaces: WorkspaceModel[];
}

export async function seedUsers(container: AwilixContainer<any>, config: SeedUsersConfig){
    const {usersAmount, workspaces} = config;
    const userBaseRepository: UserBaseRepository = container.resolve('userBaseRepository');
    const users: UserBaseModel[] = [];

    workspaces.reduce((target, workspace) => {
            target.push(UserBaseModel.create({
                id: uuid(),
                email: `manager+${workspace.id}`,
                password: `123456`,
                workspace,
                type: UserBaseType.MANAGER
            }));
            for (let i = 0; i<usersAmount; i++){
                target.push(UserBaseModel.create({
                    id: uuid(),
                    email: `user+${i}@test.com`,
                    password: `123456`,
                    workspace,
                    type: UserBaseType.USER
                }))
            }
        return target;
    }, users);

    return userBaseRepository.save(users);
}
