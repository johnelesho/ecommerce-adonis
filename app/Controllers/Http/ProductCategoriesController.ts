import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategoryValidator from '../../Validators/ProductCategoryValidator'
import ProductCategory from '../../Models/ProductCategory'

export default class ProductCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    response.ok({
      message: 'All Categories Found',
      data: request.toJSON(),
    })
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductCategoryValidator)
      const category = await ProductCategory.create(payload)
      response.created({
        message: 'No Categories Created',
        data: category,
      })
    } catch (err) {
      response.badRequest({
        message: err.message,
        data: null,
      })
    }
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
