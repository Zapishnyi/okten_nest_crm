import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeSmallCorrections1736444877073 implements MigrationInterface {
    name = 'SomeSmallCorrections1736444877073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``);
        await queryRunner.query(`ALTER TABLE \`groups\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD \`name\` varchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`phone\` varchar(13) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`phone\` varchar(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\``);
        await queryRunner.query(`ALTER TABLE \`groups\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD \`name\` varchar(15) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\` (\`name\`)`);
    }

}
