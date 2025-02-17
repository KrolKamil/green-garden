import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserNoteModel } from "./user-note.model";
import { AssignedGardensModel } from "../../gardens/models/assigned-gardens.model";

interface UserBaseModelProps {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
  type: UserBaseType;
  active?: boolean;
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

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({})
  name: string;

  @Column({})
  surname: string;

  @Column({})
  phone: string;

  @Column()
  type: UserBaseType;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToOne(() => UserNoteModel)
  @JoinColumn({ name: "user_note_id" })
  userNote: UserNoteModel | null;

  @OneToMany(() => AssignedGardensModel, (assignedGarden) => assignedGarden.userBase)
  assignedGardens: AssignedGardensModel[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
