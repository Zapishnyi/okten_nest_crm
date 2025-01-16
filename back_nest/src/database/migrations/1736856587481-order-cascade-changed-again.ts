import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderCascadeChangedAgain1736856587481 implements MigrationInterface {
    name = 'OrderCascadeChangedAgain1736856587481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
