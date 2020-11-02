import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserBaseTimestamps1603998572358 implements MigrationInterface {
    name = 'AddUserBaseTimestamps1603998572358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" DROP COLUMN "created_at"`, undefined);
    }

}
