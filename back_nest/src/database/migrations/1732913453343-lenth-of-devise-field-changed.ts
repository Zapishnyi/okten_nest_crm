import { MigrationInterface, QueryRunner } from "typeorm";

export class LenthOfDeviseFieldChanged1732913453343 implements MigrationInterface {
    name = 'LenthOfDeviseFieldChanged1732913453343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`device\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`device\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`device\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`device\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`device\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`device\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`device\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`device\` varchar(100) NOT NULL`);
    }

}
