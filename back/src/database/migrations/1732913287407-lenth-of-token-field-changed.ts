import { MigrationInterface, QueryRunner } from "typeorm";

export class LenthOfTokenFieldChanged1732913287407 implements MigrationInterface {
    name = 'LenthOfTokenFieldChanged1732913287407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`access\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`access\` varchar(292) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(292) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(292) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`access\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`access\` varchar(60) NOT NULL`);
    }

}
