import {MigrationInterface, QueryRunner} from "typeorm";

export class AssignedGardensChangeDateColumnType1606849579655 implements MigrationInterface {
    name = 'AssignedGardensChangeDateColumnType1606849579655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP COLUMN "assigned_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD "assigned_at" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP COLUMN "unassigned_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD "unassigned_at" TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP COLUMN "unassigned_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD "unassigned_at" date`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" DROP COLUMN "assigned_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "assigned_gardens" ADD "assigned_at" date NOT NULL`, undefined);
    }

}
