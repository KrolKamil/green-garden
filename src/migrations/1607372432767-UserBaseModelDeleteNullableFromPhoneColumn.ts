import {MigrationInterface, QueryRunner} from "typeorm";

export class UserBaseModelDeleteNullableFromPhoneColumn1607372432767 implements MigrationInterface {
    name = 'UserBaseModelDeleteNullableFromPhoneColumn1607372432767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "phone" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "phone" DROP NOT NULL`, undefined);
    }

}
