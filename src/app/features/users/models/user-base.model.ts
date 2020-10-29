import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

interface UserBaseModelProps {
  id: string;
  email: string;
  password: string;
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

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
