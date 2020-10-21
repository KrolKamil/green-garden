import { Entity, PrimaryColumn } from "typeorm";

interface WorkspaceModelProps {
  id: string;
}

@Entity({
  name: "workspace"
})
export class WorkspaceModel {

  public static create(data: WorkspaceModelProps): WorkspaceModel {
    const entity = new WorkspaceModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;
}
