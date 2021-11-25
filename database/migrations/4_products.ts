import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DayType } from '../../app/Models/Product'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //   {
      //   primaryKey: true,
      // })

      table.integer('user_id', 10).unsigned().references('users.id').onDelete('CASCADE')
      table
        .integer('product_category_id', 10)
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')
      table
        .integer('product_sub_category_id', 10)
        .unsigned()
        .references('product_sub_categories.id')
        .onDelete('CASCADE')
      table.string('address', 255)
      table.string('title', 255)
      table.text('calendar_days').nullable()
      table.text('description')
      table.enu('day_type', Object.values(DayType), {
        useNative: true,
        enumName: 'products_day_type_enum',
        existingType: false,
      })
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
