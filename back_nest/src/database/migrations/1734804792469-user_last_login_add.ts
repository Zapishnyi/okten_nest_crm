import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLastLoginAdd1734804792469 implements MigrationInterface {
    name = 'UserLastLoginAdd1734804792469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login\``);
    }

}
