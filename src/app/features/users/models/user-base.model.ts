import { Column, Entity, PrimaryColumn } from "typeorm";

interface UserBaseModelProps {
  id: string;
  email: string;
  password: string;
}

enum UserType {
  MANAGER = 'MANAGER',
  USER = 'USER'
}

@Entity({
  name: "user_base"
})
export class UserBaseModel {

  public static create(data: Partial<UserBaseModelProps>): UserBaseModel {
    const entity = new UserBaseModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column()
  type: UserType;
}
