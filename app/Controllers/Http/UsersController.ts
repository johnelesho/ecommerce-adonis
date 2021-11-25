import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from '../../Validators/UserValidator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    response.ok({
      message: 'All Product Found',
      data: request.toJSON(),
    })
  }

  public async show({ response, request }: HttpContextContract) {
    response.ok({
      message: `Product Found: #${request.param('id')}`,
      data: request.toJSON(),
    })
  }

  public async update({ request, response }: HttpContextContract) {
    response.ok({
      message: `Product Updated: #${request.params['id']}`,
      data: request.toJSON(),
    })
  }

  public async destroy({ request, response }: HttpContextContract) {
    response.noContent()
  }
}
