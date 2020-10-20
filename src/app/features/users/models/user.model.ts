import { Column, Entity, PrimaryColumn } from "typeorm";

interface UserModelProps {
  id: string;
  email: string;
  password: string;
}

enum UserType {
  MANAGER = 'MANAGER',
  USER = 'USER'
}

@Entity({
  name: "user"
})
export class UserModel {

  public static create(data: UserModelProps): UserModel {
    const entity = new UserModel();
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
