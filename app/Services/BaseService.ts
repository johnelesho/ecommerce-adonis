import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import BaseInterface from 'Contracts/interfaces/Base.Interface'

export default class BaseService implements BaseInterface {
  protected model

  constructor(model: typeof BaseModel) {
    this.model = model
  }

  public async find(id: number) {
    return this.model.find(id)
  }
}
