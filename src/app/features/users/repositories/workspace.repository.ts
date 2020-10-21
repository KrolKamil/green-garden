import { Repository, EntityRepository } from "typeorm";
import { WorkspaceModel } from "../../workspace/models/workspace.model";

@EntityRepository(WorkspaceModel)
export class WorkspaceRepository extends Repository<WorkspaceModel> {
}
