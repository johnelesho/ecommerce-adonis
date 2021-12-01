import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductSubCategory from './ProductSubCategory'
import Product from './Product'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => ProductSubCategory)
  public productSubCategories: HasMany<typeof ProductSubCategory>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
