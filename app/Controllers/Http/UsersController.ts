import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from '../../Validators/UserValidator'
import User from '../../Models/User'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const users = await User.all()

      response.ok({
        message: 'All Registered Users',
        data: users,
      })
    } catch (err) {
      response.serviceUnavailable({
        data: null,
        message: err,
      })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const user = await User.findOrFail(request.param('id'))

      response.ok({
        message: 'Users',
        data: user,
      })
    } catch (err) {
      response.notFound({
        data: null,
        message: err,
      })
    }
  }

  public async update({ request, bouncer, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(request.param('id'))
      const payload = await request.validate(UserValidator)
      Object.assign(user, payload)
      const rule = await bouncer.authorize('isUserInfoOruserAdmin', user)

      const resp = await user.save()
      response.ok({
        message: 'User Updated',
        data: resp,
      })
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }

  public async destroy({ request, bouncer, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(request.param('id'))
      await bouncer.authorize('isAdmin')
      await user.delete()
      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }
}
