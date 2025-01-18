import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1737224956480 implements MigrationInterface {
    name = 'Initial1737224956480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`activate_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`activate\` varchar(308) NOT NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`REL_8a0e910a19c2e855b2fd78cfb2\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`access\` varchar(308) NOT NULL, \`refresh\` varchar(308) NOT NULL, \`device\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(25) NOT NULL, \`surname\` varchar(25) NOT NULL, \`email\` varchar(100) NULL, \`password\` varchar(60) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`ban\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('admin', 'manager') NOT NULL DEFAULT 'manager', \`last_login\` timestamp NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`comment\` varchar(100) NOT NULL, \`orderId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(25) NOT NULL, UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD CONSTRAINT \`FK_9691367d446cd8b18f462c191b3\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP FOREIGN KEY \`FK_9691367d446cd8b18f462c191b3\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`auth_tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_8a0e910a19c2e855b2fd78cfb2\` ON \`activate_tokens\``);
        await queryRunner.query(`DROP TABLE \`activate_tokens\``);
    }

}
