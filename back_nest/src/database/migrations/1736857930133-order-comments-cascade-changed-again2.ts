import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderCommentsCascadeChangedAgain21736857930133 implements MigrationInterface {
    name = 'OrderCommentsCascadeChangedAgain21736857930133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
