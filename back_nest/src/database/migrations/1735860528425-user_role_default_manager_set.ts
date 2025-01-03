import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleDefaultManagerSet1735860528425 implements MigrationInterface {
    name = 'UserRoleDefaultManagerSet1735860528425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'manager') NOT NULL DEFAULT 'manager'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'manager') NOT NULL`);
    }

}
