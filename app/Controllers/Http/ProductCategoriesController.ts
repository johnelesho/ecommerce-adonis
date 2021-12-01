import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import CategoryServices from '@ioc:MiniEcommerce/CategoryService'
import CategoryService from 'App/Services/CategoryService'

export default class ProductCategoriesController {
  protected categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }
  public async index({ response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()
    // const categories = (await ProductCategory.all()).slice(limit, page * limit)
    const categories = await this.categoryService.findAll()
    response.ok({
      message: 'All products Categories Found',
      data: categories,
    })
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const category = await this.categoryService.findOne(request.param('id'))

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

  public async store({ request, bouncer, response }: HttpContextContract) {
    try {
      await bouncer.authorize('isAdmin')
      // const payload = await request.validate(ProductCategoryValidator)
      const category = await this.categoryService.create(request)
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

  public async update({ request, bouncer, response }: HttpContextContract) {
    try {
      // Authorize only the admin to edit product category information
      await bouncer.authorize('isAdmin')
      const product = await this.categoryService.findOne(request.param('id'))

      const updatedProduct = await this.categoryService.update(product, request)

      response.ok({
        message: `Category Updated #${request.param('id')}`,
        data: updatedProduct,
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
      // Only an admin should be delete a ProductCategory from the system
      await bouncer.authorize('isAdmin')
      await this.categoryService.delete(request.param('id'))

      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }

  // All products in a category
  public async productsInCategory({ request, response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()

    const categories = await this.categoryService.allProductsInCategory(
      request.param('category_id')
    )
    response // const categories = (await ProductCategory.all()).slice(limit, page * limit)
      .ok({
        message: 'All products in Categories Found',
        data: categories,
      })
  }
  public async getAllSubCategory({ request, response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()

    const categories = await this.categoryService.allSubCategories(request.param('category_id'))
    response // const categories = (await ProductCategory.all()).slice(limit, page * limit)
      .ok({
        message: 'All sub Categories Found',
        data: categories,
      })
  }
}
