import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUserReel1734712165204 implements MigrationInterface {
    name = 'UserUserReel1734712165204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`user_rel\` varchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userRelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupRelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_2709ed5c92a301ca2a4504cea8e\` FOREIGN KEY (\`userRelId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_2ecf64fe843eb16aa445d1be64b\` FOREIGN KEY (\`groupRelId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_2ecf64fe843eb16aa445d1be64b\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_2709ed5c92a301ca2a4504cea8e\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupRelId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userRelId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`user_rel\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
