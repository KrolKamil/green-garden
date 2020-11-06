import { Column, Entity, PrimaryColumn } from "typeorm";

interface GardenModelProps {
  id: string;
  publicId: string;
  surfaceInSquareMeters: number;
  includeWater: boolean;
  includeElectricity: boolean;
  includeGas: boolean;
}

@Entity({
  name: "garden"
})
export class GardenModel {

  public static create(data: Partial<GardenModelProps>): GardenModel {
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
}
