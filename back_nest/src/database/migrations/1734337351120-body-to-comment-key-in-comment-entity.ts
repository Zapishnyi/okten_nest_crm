import { MigrationInterface, QueryRunner } from "typeorm";

export class BodyToCommentKeyInCommentEntity1734337351120 implements MigrationInterface {
    name = 'BodyToCommentKeyInCommentEntity1734337351120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`body\` \`comment\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`comment\` \`body\` varchar(100) NOT NULL`);
    }

}
