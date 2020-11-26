import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { UserBaseModel } from "../../users/models/user-base.model";

interface NoticeModelProps {
  id: string;
  title: string;
  content: string;
  type: NoticeType;
  creator: UserBaseModel | string;
}

export enum NoticeType {
  NORMAL = 'NORMAL',
  IMPORTANT = 'IMPORTNAT'
}

@Entity({
  name: "notice"
})
export class NoticeModel {

  public static create(data: NoticeModelProps): NoticeModel {
    const entity = new NoticeModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: NoticeType;

  @ManyToOne(() => UserBaseModel)
  creator: UserBaseModel | string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
