import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivateTokenUserIdAdd1733128153226 implements MigrationInterface {
    name = 'ActivateTokenUserIdAdd1733128153226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_26a8e3409f90f0e180ed4d8314d\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`device\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`device\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_26a8e3409f90f0e180ed4d8314d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
