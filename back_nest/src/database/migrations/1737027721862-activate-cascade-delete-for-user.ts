import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivateCascadeDeleteForUser1737027721862 implements MigrationInterface {
    name = 'ActivateCascadeDeleteForUser1737027721862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` DROP FOREIGN KEY \`FK_8a0e910a19c2e855b2fd78cfb2d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activate_tokens\` ADD CONSTRAINT \`FK_8a0e910a19c2e855b2fd78cfb2d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
