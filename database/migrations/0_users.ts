import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserStatus, UserType } from '../../app/Models/User'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('username', 255).notNullable().unique()
      table.string('remember_me_token', 255).nullable()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.string('contact_number', 255)
      table.text('address').notNullable()
      // table.enum('type', ['ADMIN', 'USER']).notNullable()
      table.enu('status', Object.values(UserStatus), {
        useNative: true,
        enumName: 'users_status_enum',
        existingType: false,
      })
      table
        .enu('type', Object.values(UserType), {
          useNative: true,
          enumName: 'users_type_enum',
          existingType: false,
        })
        .notNullable()
        .defaultTo('USER')

      // table.enum('status', ['SINGLE', 'MARRIED', 'DIVORCED']).notNullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
