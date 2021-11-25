import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => ProductCategory)
  public ProductCategoryId: HasMany<typeof ProductCategory>

  @column()
  public name: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
