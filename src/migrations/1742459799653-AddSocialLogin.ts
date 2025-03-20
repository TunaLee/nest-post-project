import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSocialLogin1742459799653 implements MigrationInterface {
    name = 'AddSocialLogin1742459799653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "socialId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "registerType" character varying NOT NULL DEFAULT 'common'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerType"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialId"`);
    }

}
