import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserBaseType } from "./user-base.model";

interface PendingUserModelProps {
  id: string;
  email: string;
  type: UserBaseType;
}

@Entity({
  name: "pending_user"
})
export class PendingUserModel {

  public static create(data: PendingUserModelProps): PendingUserModel {
    const entity = new PendingUserModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  type: UserBaseType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
