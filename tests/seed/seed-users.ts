import {v4 as uuid} from 'uuid';
import { AwilixContainer } from "awilix";
import { WorkspaceModel } from "../../src/app/features/workspace/models/workspace.model";
import { UserBaseModel, UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { UserBaseRepository } from '../../src/app/features/users/repositories/user-base.repository';
import { HashService } from '../../src/app/services/hash.service';

interface SeedUsersConfig {
    usersAmount: number;
    workspaces: WorkspaceModel[];
}

export async function seedUsers(container: AwilixContainer<any>, config: SeedUsersConfig){
    const {usersAmount, workspaces} = config;
    const userBaseRepository: UserBaseRepository = container.resolve('userBaseRepository');
    const hashService: HashService = container.resolve("hashService");
    const users: UserBaseModel[] = [];

    const hashedPassword = await hashService.hash('123456');

    workspaces.reduce((target, workspace) => {
            target.push(UserBaseModel.create({
                id: uuid(),
                email: `manager+${workspace.id}@test.com`,
                password: hashedPassword,
                workspace,
                type: UserBaseType.MANAGER
            }));
            for (let i = 0; i<usersAmount; i++){
                target.push(UserBaseModel.create({
                    id: uuid(),
                    email: `user+${i}@test.com`,
                    password: hashedPassword,
                    workspace,
                    type: UserBaseType.USER
                }))
            }
        return target;
    }, users);

    return userBaseRepository.save(users);
}
