import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedTypeOfTokenToVarcharNoLength1732915202602 implements MigrationInterface {
    name = 'ChangedTypeOfTokenToVarcharNoLength1732915202602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(292) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(292) NOT NULL`);
    }

}
