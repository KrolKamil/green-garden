import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserBaseAndWorkspaceModels1603747508037 implements MigrationInterface {
    name = 'AddUserBaseAndWorkspaceModels1603747508037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_base" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "surname" character varying, "phone" character varying, "type" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_5fcd6a1b8d97bbe4ac2dfc2819f" UNIQUE ("email"), CONSTRAINT "PK_abddcf5bb4dde7a5fe7b85b716c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_base"`, undefined);
    }

}
