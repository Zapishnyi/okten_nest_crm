import { MigrationInterface, QueryRunner } from "typeorm";

export class Back1734717460612 implements MigrationInterface {
    name = 'Back1734717460612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5d6bb8b8d415f4808a784b4aa9\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group\``);
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
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group\` varchar(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager\` varchar(25) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_5d6bb8b8d415f4808a784b4aa9\` ON \`users\` (\`surname\`)`);
    }

}
