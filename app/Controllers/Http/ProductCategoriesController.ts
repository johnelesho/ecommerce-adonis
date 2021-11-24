import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategoryValidator from '../../Validators/ProductCategoryValidator'

export default class ProductCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    response.ok({
      message: 'All Product Found',
      data: request.toJSON(),
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const product = await request.validate(ProductCategoryValidator)
    response.created({
      message: 'Product Created',
      data: product,
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
