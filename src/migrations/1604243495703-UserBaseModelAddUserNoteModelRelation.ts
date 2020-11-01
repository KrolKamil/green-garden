import {MigrationInterface, QueryRunner} from "typeorm";

export class UserBaseModelAddUserNoteModelRelation1604243495703 implements MigrationInterface {
    name = 'UserBaseModelAddUserNoteModelRelation1604243495703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_note" ("id" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de9eca07e8faa7006abc18152c6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ADD "user_note_id" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ADD CONSTRAINT "UQ_0a5cde85f4e3a9af376e41e47d2" UNIQUE ("user_note_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ADD CONSTRAINT "FK_0a5cde85f4e3a9af376e41e47d2" FOREIGN KEY ("user_note_id") REFERENCES "user_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" DROP CONSTRAINT "FK_0a5cde85f4e3a9af376e41e47d2"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" DROP CONSTRAINT "UQ_0a5cde85f4e3a9af376e41e47d2"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" DROP COLUMN "user_note_id"`, undefined);
        await queryRunner.query(`DROP TABLE "user_note"`, undefined);
    }

}
