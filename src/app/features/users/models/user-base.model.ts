import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { WorkspaceModel } from "../../workspace/models/workspace.model";

interface UserBaseModelProps {
  id: string;
  email: string;
  password: string;
  type: UserBaseType;
  workspace: WorkspaceModel;
}

export enum UserBaseType {
  MANAGER = "MANAGER",
  USER = "USER",
}

@Entity({
  name: "user_base",
})
export class UserBaseModel {
  public static create(data: UserBaseModelProps): UserBaseModel {
    const entity = new UserBaseModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  surname: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column()
  type: UserBaseType;

  @ManyToOne(() => WorkspaceModel)
  workspace: WorkspaceModel;
}
