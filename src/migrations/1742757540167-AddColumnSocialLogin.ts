import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnSocialLogin1742757540167 implements MigrationInterface {
    name = 'AddColumnSocialLogin1742757540167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageUrl" character varying NOT NULL, "filePath" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "socialId" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."user_registertype_enum" AS ENUM('common', 'google', 'kakao', 'naver')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "registerType" "public"."user_registertype_enum" NOT NULL DEFAULT 'common'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerType"`);
        await queryRunner.query(`DROP TYPE "public"."user_registertype_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialId"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
