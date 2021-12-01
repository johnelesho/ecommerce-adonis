import { BaseModel, LucidModel } from '@ioc:Adonis/Lucid/Orm'
import BaseInterface from 'Contracts/interfaces/Base.Interface'

export default class BaseService implements BaseInterface {
  protected model

  constructor(model: typeof BaseModel) {
    this.model = model
  }
  public async findAll() {
    return await this.model.all()
  }
  public async findOne(id: number) {
    return await this.model.find(id)
  }
}
