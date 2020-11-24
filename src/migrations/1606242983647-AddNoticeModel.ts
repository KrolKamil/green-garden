import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNoticeModel1606242983647 implements MigrationInterface {
    name = 'AddNoticeModel1606242983647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notice" ("id" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" character varying, CONSTRAINT "PK_705062b14410ff1a04998f86d72" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "notice" ADD CONSTRAINT "FK_6e851ea06c874eb0ff39162372a" FOREIGN KEY ("creator_id") REFERENCES "user_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notice" DROP CONSTRAINT "FK_6e851ea06c874eb0ff39162372a"`, undefined);
        await queryRunner.query(`DROP TABLE "notice"`, undefined);
    }

}
