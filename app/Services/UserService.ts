import { RequestContract } from '@ioc:Adonis/Core/Request'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UserValidator from 'App/Validators/UserValidator'
import UserInterface from 'Contracts/interfaces/User.Interface'
import BaseService from './BaseService'

export default class UserService extends BaseService implements UserInterface {
  constructor() {
    super(User)
  }
  public async delete(userId: number) {
    const user = await this.model.findOrFail(userId)
    await user.delete()
  }
  public async findOne(id: number): Promise<User> {
    const user = await this.model.findOrFail(id)

    return user
  }
  public async find(): Promise<User[]> {
    return await this.model.all()
  }
  public async register(data: any): Promise<User> {
    try {
      const user = await data.validate(UserValidator)
      const registeredUser = await this.model.create({ ...user })
      return registeredUser
    } catch (err) {
      throw err
    }
  }
  public async update(user: User, data: RequestContract): Promise<User> {
    try {
      const payload = await data.validate(UpdateUserValidator)
      Object.assign(user, payload)

      return await user.save()
    } catch (err) {
      throw err
    }
  }
}
