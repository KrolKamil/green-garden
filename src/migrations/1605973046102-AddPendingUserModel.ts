import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPendingUserModel1605973046102 implements MigrationInterface {
    name = 'AddPendingUserModel1605973046102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pending_user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ea2c9c5daf7f8339c58f5325734" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" DROP CONSTRAINT "UQ_5fcd6a1b8d97bbe4ac2dfc2819f"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ADD CONSTRAINT "UQ_5fcd6a1b8d97bbe4ac2dfc2819f" UNIQUE ("email")`, undefined);
        await queryRunner.query(`DROP TABLE "pending_user"`, undefined);
    }

}
