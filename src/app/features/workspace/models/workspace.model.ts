import { Entity, PrimaryColumn, Column } from "typeorm";

interface WorkspaceModelProps {
  id: string;
  name: string;
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

  @Column({
    unique: true
  })
  name: string;
}
