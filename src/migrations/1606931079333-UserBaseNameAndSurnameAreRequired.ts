import {MigrationInterface, QueryRunner} from "typeorm";

export class UserBaseNameAndSurnameAreRequired1606931079333 implements MigrationInterface {
    name = 'UserBaseNameAndSurnameAreRequired1606931079333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "name" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "surname" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "surname" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_base" ALTER COLUMN "name" DROP NOT NULL`, undefined);
    }

}
