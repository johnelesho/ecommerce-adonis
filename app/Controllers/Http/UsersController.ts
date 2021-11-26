import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserServices from '@ioc:MiniEcommerce/UserService'
import UserService from 'App/Services/UserService'

export default class UsersController {
  protected userService: UserService

  constructor() {
    this.userService = UserServices
  }

  public async index({ response, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('isAdmin')
      const users = await this.userService.find()

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
      const user = await this.userService.findOne(request.param('id'))

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
      const userId = request.param('id')
      // find the user using the repository layer
      const user = await this.userService.findOne(userId)
      // Update can only be made by the admin or the user to whom the info belong
      await bouncer.authorize('isUserInfoOruserAdmin', user)

      const resp = await this.userService.update(user, request)
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
      // Only an admin should be delete a user from the system
      await bouncer.authorize('isAdmin')
      await this.userService.delete(request.param('id'))
      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }
}
