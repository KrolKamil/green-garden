import { v4 as uuid } from "uuid";
import { AwilixContainer } from "awilix";
import { WorkspaceModel } from "../../src/app/features/workspace/models/workspace.model";
import { WorkspaceRepository } from "../../src/app/features/users/repositories/workspace.repository";

interface SeedWorkspacesConfig {
  workspacesAmount: number;
}

export async function seedWorkspaces(container: AwilixContainer<any>, config: SeedWorkspacesConfig) {
  const { workspacesAmount } = config;
  const workspaceRepository: WorkspaceRepository = container.resolve("workspaceRepository");
  const workspaces: WorkspaceModel[] = [];
  // eslint-disable-next-line
  for (let i = 0; i < workspacesAmount; i++) {
    workspaces.push(
      WorkspaceModel.create({
        id: uuid(),
        name: `workspace-${i}`,
      }),
    );
  }
  return workspaceRepository.save(workspaces);
}
