import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategoryValidator from '../../Validators/ProductCategoryValidator'
import ProductCategory from '../../Models/ProductCategory'

export default class ProductCategoriesController {
  public async index({ response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()

    const categories = await ProductCategory.all()
    // const categories = (await ProductCategory.all()).slice(limit, page * limit)
    response.ok({
      message: 'All products Categories Found',
      data: categories,
    })
  }

  public async store({ request, bouncer, response }: HttpContextContract) {
    try {
      await bouncer.authorize('isAdmin')
      const payload = await request.validate(ProductCategoryValidator)
      const category = await ProductCategory.create(payload)
      response.created({
        message: 'New Categories Created',
        data: category,
      })
    } catch (err) {
      response.unauthorized({
        message: err.message,
        data: err,
      })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const category = await ProductCategory.findOrFail(request.param('id'))

      response.ok({
        message: 'Category Found',
        data: category,
      })
    } catch (err) {
      response.notFound({
        data: err.message,
        message: err,
      })
    }
  }

  public async update({ request, bouncer, response }: HttpContextContract) {
    try {
      // Authorize only the admin to edit product category information

      await bouncer.authorize('isAdmin')
      const category = await ProductCategory.findOrFail(request.param('id'))
      const payload = await request.validate(ProductCategoryValidator)
      Object.assign(category, payload)

      const resp = await category.save()
      response.ok({
        message: `Category Updated #${request.param('id')}`,
        data: resp,
      })
    } catch (err) {
      response.notFound({
        data: err,
        message: err.message,
      })
    }
  }

  public async destroy({ request, bouncer, response }: HttpContextContract) {
    try {
      const category = await ProductCategory.findOrFail(request.param('id'))
      // Only an admin should be delete a ProductCategory from the system
      await bouncer.authorize('isAdmin')
      await category.delete()
      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }
}
