import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubCategoryValidator from '../../Validators/ProductSubCategoryValidator'

export default class ProductSubCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    response.ok({
      message: 'All Product Found',
      data: request.toJSON(),
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const product = await request.validate(ProductSubCategoryValidator)
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
