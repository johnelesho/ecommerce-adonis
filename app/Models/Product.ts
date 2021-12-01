import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public dayType: DayType

  @column()
  public calendarDays: string

  @column()
  public productCategoryId: number

  @column()
  public productSubCategoryId: number

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

export enum DayType {
  BlackFriday = 'Black_Friday',
  Normal = 'Normal',
  Weekend = 'Weekend',
  Weekday = 'Weekday',
}
