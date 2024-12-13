import { MigrationInterface, QueryRunner } from "typeorm";

export class GroupEntityAndTablesConnectionAdded1734094183033 implements MigrationInterface {
    name = 'GroupEntityAndTablesConnectionAdded1734094183033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(15) NOT NULL, UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
    }

}
