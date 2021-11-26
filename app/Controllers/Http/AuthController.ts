import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserServices from '@ioc:MiniEcommerce/UserService'

import LoginValidator from '../../Validators/LoginValidator'
import UserService from '../../Services/UserService'

export default class AuthController {
  protected userService: UserService

  constructor() {
    this.userService = UserServices
  }
  public async register({ request, auth, response }: HttpContextContract) {
    try {
      const registered = await this.userService.register(request)
      const { email, password, username } = request.body()
      const token = await auth.use('api').attempt(email || username, password, {
        expiresIn: '7days',
      })

      return response.ok({
        data: registered,
        message: 'Login Successful',
        token,
      })
    } catch (err) {
      return response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password, username } = await request.validate(LoginValidator)

    // User logs in with their password and one of their email and username
    try {
      const token = await auth.use('api').attempt(email! || username!, password, {
        expiresIn: '7days',
      })

      return response.ok({
        message: 'Login Successful',
        token,
      })
    } catch (err) {
      return response.badRequest({
        message: err.message,
        data: err,
      })
    }
  }

  public async currentUser({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user!
      return response.ok({
        message: 'Current User Info',
        data: user,
      })
    } catch (err) {
      return response.badRequest({
        message: err.message,
      })
    }
  }
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
