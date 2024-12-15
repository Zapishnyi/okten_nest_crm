import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentsAdd1734281592309 implements MigrationInterface {
    name = 'CommentsAdd1734281592309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8a0e910a19c2e855b2fd78cfb2\` ON \`activate_tokens\``);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`body\` varchar(100) NOT NULL, \`orderId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_c05f4c1d32c34e63e35c7ae7c67\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_c05f4c1d32c34e63e35c7ae7c67\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8a0e910a19c2e855b2fd78cfb2\` ON \`activate_tokens\` (\`user_id\`)`);
    }

}
