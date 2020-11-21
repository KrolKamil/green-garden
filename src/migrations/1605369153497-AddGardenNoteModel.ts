import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGardenNoteModel1605369153497 implements MigrationInterface {
    name = 'AddGardenNoteModel1605369153497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "garden_note" ("id" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fd308f4069afb0e2c4f63df1e3e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" ADD "garden_note_id" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" ADD CONSTRAINT "UQ_c4c0bb455c5f1c8a88fc8f26bdd" UNIQUE ("garden_note_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" ADD CONSTRAINT "FK_c4c0bb455c5f1c8a88fc8f26bdd" FOREIGN KEY ("garden_note_id") REFERENCES "garden_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garden" DROP CONSTRAINT "FK_c4c0bb455c5f1c8a88fc8f26bdd"`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" DROP CONSTRAINT "UQ_c4c0bb455c5f1c8a88fc8f26bdd"`, undefined);
        await queryRunner.query(`ALTER TABLE "garden" DROP COLUMN "garden_note_id"`, undefined);
        await queryRunner.query(`DROP TABLE "garden_note"`, undefined);
    }

}
