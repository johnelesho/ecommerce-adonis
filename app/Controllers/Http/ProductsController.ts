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
        message: error.message,
        data: null,
      })
    }
  }
  public async getAllProductsByCurrentUser({ response, auth }: HttpContextContract) {
    try {
      const products = await this.productService.productsByCurrentUser(auth.user!)
      response.ok({
        message: 'All Product By Current User',
        data: products,
      })
    } catch (error) {
      response.abort({
        message: error.message,
        data: null,
      })
    }
  }

  public async getAllProductsByUser({ request, response }: HttpContextContract) {
    try {
      const products = await this.productService.productsByUser(request.param('userId'))
      response.ok({
        message: 'All Product By User',
        data: products,
      })
    } catch (error) {
      response.abort({
        message: error.message,
        data: null,
      })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
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
    try {
      const product = await this.productService.findOne(request.param('id'))
      response.ok({
        message: `Product Found: #${request.param('id')}`,
        data: product,
      })
    } catch (error) {
      response.badRequest({
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    try {
      const product = await this.productService.findOne(request.param('id'))
      await bouncer.authorize('userProductOrAdmin', product)
      const updatedProduct = await this.productService.update(product, request)
      response.ok({
        message: `Product Updated: #${request.params['id']}`,
        data: updatedProduct,
      })
    } catch (error) {
      response.badRequest({
        message: error.message,
        data: null,
      })
    }
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
