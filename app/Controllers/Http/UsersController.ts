import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UpdateUserValidator from '../../Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ response, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('isAdmin')
      const users = await User.all()

      response.ok({
        message: 'All Registered Users',
        data: users,
        totalNumberOfUsers: users.length,
      })
    } catch (err) {
      response.unauthorized({
        data: err,
        message: err.message,
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
        data: err,
        message: err.message,
      })
    }
  }

  public async update({ request, bouncer, response }: HttpContextContract) {
    try {
      // Authorize only the user to edit their own details except thec current user is an Admin
      const user = await User.findOrFail(request.param('id'))
      await bouncer.authorize('isUserInfoOruserAdmin', user)
      const payload = await request.validate(UpdateUserValidator)
      Object.assign(user, payload)

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
      // Only an admin should be delete a user from the system
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
