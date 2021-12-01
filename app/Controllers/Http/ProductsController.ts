import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductServices from '@ioc:MiniEcommerce/ProductService'
import ProductService from 'App/Services/ProductService'

export default class ProductsController {
  protected productService: ProductService

  constructor() {
    this.productService = ProductServices
  }
  public async index({ response }: HttpContextContract) {
    try {
      const products = await this.productService.index()
      response.ok({
        message: 'All Product Found',
        data: products,
      })
    } catch (error) {
      response.abort({
        message: error,
        data: error.message,
      })
    }
  }
  public async getAllProductsByUser({ response, auth }: HttpContextContract) {
    try {
      const products = await this.productService.productsByUser(auth.user!)
      response.ok({
        message: 'All Product Found',
        data: products,
      })
    } catch (error) {
      response.abort({
        message: error,
        data: error.message,
      })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      // const payload = await request.validate(ProductValidator)
      // const product = await Product.create({ ...payload, userId: auth.user?.id })
      const product = await this.productService.create(auth.user!, request)
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
    const product = await this.productService.findOne(request.param('id'))
    response.ok({
      message: `Product Found: #${request.param('id')}`,
      data: product,
    })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const product = await this.productService.findOne(request.param('id'))
    await bouncer.authorize('userProductOrAdmin', product)
    const updatedProduct = await this.productService.update(product, request)
    response.ok({
      message: `Product Updated: #${request.params['id']}`,
      data: updatedProduct,
    })
  }

  public async destroy({ request, bouncer, response }: HttpContextContract) {
    try {
      // Only an admin should be delete a user from the system
      await bouncer.authorize('isAdmin')
      await this.productService.delete(request.param('id'))
      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }
}
