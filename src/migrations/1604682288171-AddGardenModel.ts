import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGardenModel1604682288171 implements MigrationInterface {
    name = 'AddGardenModel1604682288171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "garden" ("id" character varying NOT NULL, "public_id" character varying NOT NULL, "surface_in_square_meters" integer NOT NULL, "include_water" boolean NOT NULL DEFAULT false, "include_electricity" boolean NOT NULL DEFAULT false, "include_gas" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_a183089d71f22dcc89478a53b29" UNIQUE ("public_id"), CONSTRAINT "PK_d08af92b4c172606e5372364553" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "garden"`, undefined);
    }

}
