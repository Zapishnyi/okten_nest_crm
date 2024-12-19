import { MigrationInterface, QueryRunner } from "typeorm";

export class JustToCheck1734645134311 implements MigrationInterface {
    name = 'JustToCheck1734645134311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`name\` \`name\` varchar(25) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`surname\` \`surname\` varchar(25) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`email\` \`email\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`phone\` \`phone\` varchar(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course\` \`course\` enum ('FS', 'QACX', 'JSX', 'JSCX', 'FE', 'PCX') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course_format\` \`course_format\` enum ('static', 'online') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course_type\` \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course_type\` \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course_format\` \`course_format\` enum ('static', 'online') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`course\` \`course\` enum ('FS', 'QACX', 'JSX', 'JSCX', 'FE', 'PCX') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`phone\` \`phone\` varchar(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`email\` \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`surname\` \`surname\` varchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`name\` \`name\` varchar(25) NOT NULL`);
    }

}
