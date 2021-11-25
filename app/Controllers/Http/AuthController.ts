import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from '../../Validators/LoginValidator'
import UserValidator from '../../Validators/UserValidator'

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    // const email = request.input('email')
    // const password = request.input('password')

    const { email, password, username } = await request.validate(UserValidator)

    try {
      // Generate token whether the user logs in with
      // username and Password, or
      //  email and password
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7days',
      })
      // ||
      // (await auth.use('api').attempt(username, password, {
      //   expiresIn: '7days',
      // }))
      return response.ok({
        message: 'Login Successful',
        token,
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    // const email = request.input('email')
    // const password = request.input('password')
    const { email, password, username } = await request.validate(LoginValidator)

    try {
      const token =
        (await auth.use('api').attempt(email, password, {
          expiresIn: '7days',
        })) ||
        (await auth.use('api').attempt(username, password, {
          expiresIn: '7days',
        }))
      return response.ok({
        message: 'Login Successful',
        token,
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
