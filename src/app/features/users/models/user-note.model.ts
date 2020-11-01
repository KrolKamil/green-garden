import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

interface UserNoteModelProps {
  id: string;
  content: string;
}

@Entity({
  name: "user_note"
})
export class UserNoteModel {

  public static create(data: UserNoteModelProps): UserNoteModel {
    const entity = new UserNoteModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
