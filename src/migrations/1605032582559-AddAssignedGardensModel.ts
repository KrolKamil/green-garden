import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAssignedGardensModel1605032582559 implements MigrationInterface {
    name = 'AddAssignedGardensModel1605032582559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assigned_gardens" ("id" character varying NOT NULL, "assigned_at" date NOT NULL, "unassigned_at" date NOT NULL, "user_base_id" character varying, "garden_id" character varying, CONSTRAINT "PK_094c03d851a06775cc99416219b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" ADD "active" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD CONSTRAINT "FK_b177dd64a928bd2af04e49ecf90" FOREIGN KEY ("user_base_id") REFERENCES "user_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD CONSTRAINT "FK_93d6a1c55c32207c825cb038503" FOREIGN KEY ("garden_id") REFERENCES "user_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP CONSTRAINT "FK_93d6a1c55c32207c825cb038503"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP CONSTRAINT "FK_b177dd64a928bd2af04e49ecf90"`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" DROP COLUMN "active"`, undefined);
        await queryRunner.query(`DROP TABLE "assigned_gardens"`, undefined);
    }

}
