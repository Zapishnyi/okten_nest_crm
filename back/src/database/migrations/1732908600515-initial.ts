import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1732908600515 implements MigrationInterface {
    name = 'Initial1732908600515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`auth_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`access\` varchar(60) NOT NULL, \`refresh\` varchar(60) NOT NULL, \`device\` varchar(100) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activate_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`activate\` varchar(60) NOT NULL, \`device\` varchar(100) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(25) NOT NULL, \`surname\` varchar(25) NOT NULL, \`email\` varchar(100) NULL, \`password\` varchar(60) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`ban\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('admin', 'manager') NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` ADD CONSTRAINT \`FK_9691367d446cd8b18f462c191b3\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_26a8e3409f90f0e180ed4d8314d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_26a8e3409f90f0e180ed4d8314d\``);
        await queryRunner.query(`ALTER TABLE \`auth_tokens\` DROP FOREIGN KEY \`FK_9691367d446cd8b18f462c191b3\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`activate_tokens\``);
        await queryRunner.query(`DROP TABLE \`auth_tokens\``);
    }

}
