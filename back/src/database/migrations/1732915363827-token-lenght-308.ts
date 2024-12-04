import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenLenght3081732915363827 implements MigrationInterface {
    name = 'TokenLenght3081732915363827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`access\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`access\` varchar(308) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP COLUMN \`access\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD \`access\` varchar(292) NOT NULL`);
    }

}
