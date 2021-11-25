import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public type: UserType

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public contactNumber: string

  @column()
  public address: string

  @column()
  public status: UserStatus

  @hasOne(() => Product)
  public products: HasOne<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum UserStatus {
  Single = 'SINGLE',
  Married = 'MARRIED',
  Divorced = 'DIVORCED',
}
