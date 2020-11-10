import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { AssignedGardensModel } from "./assigned-gardens.model";

interface GardenModelProps {
  id: string;
  publicId: string;
  surfaceInSquareMeters: number;
  includeWater?: boolean;
  includeElectricity?: boolean;
  includeGas?: boolean;
}

@Entity({
  name: "garden"
})
export class GardenModel {

  public static create(data: GardenModelProps): GardenModel {
    const entity = new GardenModel();
    Object.assign(entity, data);
    return entity
  }

  @PrimaryColumn()
  id: string;

  @Column({unique: true})
  publicId: string;

  @Column()
  surfaceInSquareMeters: number;

  @Column({
    default: false
  })
  includeWater: boolean;

  @Column({
    default: false
  })
  includeElectricity: boolean;

  @Column({
    default: false
  })
  includeGas: boolean;

  @Column({
    default: true
  })
  active: boolean;

  @OneToMany(() => AssignedGardensModel, assignedGarden => assignedGarden.garden)
  assignedGardens: AssignedGardensModel[];
}
