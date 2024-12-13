import { MigrationInterface, QueryRunner } from "typeorm";

export class Correction1734119570918 implements MigrationInterface {
    name = 'Correction1734119570918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD UNIQUE INDEX \`IDX_8a0e910a19c2e855b2fd78cfb2\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8a0e910a19c2e855b2fd78cfb2\` ON \`activate_tokens\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`DROP INDEX \`REL_8a0e910a19c2e855b2fd78cfb2\` ON \`activate_tokens\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP INDEX \`IDX_8a0e910a19c2e855b2fd78cfb2\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
