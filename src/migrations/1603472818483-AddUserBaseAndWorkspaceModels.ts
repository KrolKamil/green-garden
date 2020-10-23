import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserBaseAndWorkspaceModels1603472818483 implements MigrationInterface {
    name = 'AddUserBaseAndWorkspaceModels1603472818483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_406f56fc2a42ad5f541973cdbee" UNIQUE ("name"), CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_base" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "surname" character varying, "phone" character varying, "type" character varying NOT NULL, "workspace_id" character varying, CONSTRAINT "UQ_5fcd6a1b8d97bbe4ac2dfc2819f" UNIQUE ("email"), CONSTRAINT "PK_abddcf5bb4dde7a5fe7b85b716c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ADD CONSTRAINT "FK_3b15ea7e0ee8bf35de810d1c2bb" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" DROP CONSTRAINT "FK_3b15ea7e0ee8bf35de810d1c2bb"`, undefined);
        await queryRunner.query(`DROP TABLE "user_base"`, undefined);
        await queryRunner.query(`DROP TABLE "workspace"`, undefined);
    }

}
