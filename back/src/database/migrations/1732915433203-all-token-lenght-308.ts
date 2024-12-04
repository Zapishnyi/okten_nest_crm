import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTokenLenght3081732915433203 implements MigrationInterface {
    name = 'AllTokenLenght3081732915433203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(308) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(308) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`activate\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`activate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`refresh\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`refresh\` varchar(255) NOT NULL`);
    }

}
