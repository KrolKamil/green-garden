import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { UserBaseModel } from "../../users/models/user-base.model";
import { GardenModel } from "./garden.model";

interface AssignedGardensModelProps {
  id: string;
  userBase: UserBaseModel;
  garden: GardenModel;
  assignedAt: Date;
}

@Entity({
  name: "assigned_gardens"
})
export class AssignedGardensModel {

  public static create(data: AssignedGardensModelProps): AssignedGardensModel {
    const entity = new AssignedGardensModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserBaseModel)
  userBase: UserBaseModel;

  @ManyToOne(() => UserBaseModel)
  garden: GardenModel;

  @Column({
    type: 'date'
  })
  assignedAt: Date;

  @Column({
    type: 'date'
  })
  unassignedAt: Date;
}
