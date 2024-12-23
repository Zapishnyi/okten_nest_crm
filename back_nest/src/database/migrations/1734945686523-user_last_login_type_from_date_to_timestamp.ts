import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLastLoginTypeFromDateToTimestamp1734945686523 implements MigrationInterface {
    name = 'UserLastLoginTypeFromDateToTimestamp1734945686523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login\` date NULL`);
    }

}
