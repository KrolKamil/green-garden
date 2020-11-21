import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

interface GardenNoteModelProps {
  id: string;
  content: string;
}

@Entity({
  name: "garden_note",
})
export class GardenNoteModel {
  public static create(data: GardenNoteModelProps): GardenNoteModel {
    const entity = new GardenNoteModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
