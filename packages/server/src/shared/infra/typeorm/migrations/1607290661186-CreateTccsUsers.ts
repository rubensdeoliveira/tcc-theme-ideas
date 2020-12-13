import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class CreateTccsUsers1607290661186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tccs',
        columns: [
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'tcc_id',
            type: 'uuid'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'users_tccs',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'fk_users_tccs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'users_tccs',
      new TableForeignKey({
        columnNames: ['tcc_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tcc_themes',
        name: 'fk_tccs_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_tccs', 'fk_tccs_users')

    await queryRunner.dropForeignKey('users_tccs', 'fk_users_tccs')

    await queryRunner.dropTable('users_tccs')
  }
}
