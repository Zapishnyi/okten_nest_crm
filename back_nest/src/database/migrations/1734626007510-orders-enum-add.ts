import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersEnumAdd1734626007510 implements MigrationInterface {
    name = 'OrdersEnumAdd1734626007510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JSX', 'JSCX', 'FE', 'PCX') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_format\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_format\` enum ('static', 'online') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_type\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('In work', 'New', 'Agree', 'Disagree', 'Dubbing') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_type\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_type\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course_format\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course_format\` varchar(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`course\` varchar(10) NOT NULL`);
    }

}
