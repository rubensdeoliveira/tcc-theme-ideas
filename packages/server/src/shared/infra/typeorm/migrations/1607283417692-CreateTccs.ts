import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTccs1607283417692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tcc_themes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'course',
            type: 'varchar'
          },
          {
            name: 'suggestion',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'area',
            type: 'varchar'
          },
          {
            name: 'links',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'fk_tcc_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tcc_themes', 'fk_tcc_user')

    await queryRunner.dropTable('tcc_themes')
  }
}
