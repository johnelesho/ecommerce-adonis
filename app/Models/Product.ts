import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public dayType: string

  @column()
  public calendarDays: string

  @hasMany(() => ProductCategory)
  public productCategoryId: HasMany<typeof ProductCategory>

  @hasOne(() => ProductSubCategory)
  public productSubCategoryId: HasOne<typeof ProductSubCategory>

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
