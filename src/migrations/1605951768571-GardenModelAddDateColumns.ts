import {MigrationInterface, QueryRunner} from "typeorm";

export class GardenModelAddDateColumns1605951768571 implements MigrationInterface {
    name = 'GardenModelAddDateColumns1605951768571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garden" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garden" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" DROP COLUMN "created_at"`, undefined);
    }

}
