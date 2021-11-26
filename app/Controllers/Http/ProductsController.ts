import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductValidator from '../../Validators/ProductValidator'
import Product from '../../Models/Product'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    response.ok({
      message: 'All Product Found',
      data: Product.all(),
    })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(ProductValidator)
      const product = await Product.create({ ...payload, userId: auth.user?.id })
      response.created({
        message: 'Product Created',
        data: product,
      })
    } catch (err) {
      response.badRequest({
        message: err.message,
        data: err,
      })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    response.ok({
      message: `Product Found: #${request.param('id')}`,
      data: request.toJSON(),
    })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const product = await Product.findOrFail(request.param('id'))

    await bouncer.authorize('userProduct', product)
    response.ok({
      message: `Product Updated: #${request.params['id']}`,
      data: request.toJSON(),
    })
  }

  public async destroy({ request, response }: HttpContextContract) {
    response.noContent()
  }
}
