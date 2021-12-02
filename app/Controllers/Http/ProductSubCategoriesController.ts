import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import SubCategoryServices from '@ioc:MiniEcommerce/SubCategoryService'
import SubCategoryService from 'App/Services/SubCategoryService'

export default class ProductSubCategoriesController {
  protected subCategoryService: SubCategoryService

  constructor() {
    this.subCategoryService = new SubCategoryService()
  }
  public async index({ response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()

    const categories = await this.subCategoryService.findAll()
    // const categories = (await ProductSubCategory.all()).slice(limit, page * limit)
    response.ok({
      message: 'All products Sub Categories Found',
      data: categories,
    })
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const category = await this.subCategoryService.findOne(request.param('id'))
      // const category = await ProductSubCategory.findOrFail(request.param('id'))

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

      const category = await this.subCategoryService.create(request.param('category_id'), request)

      response.created({
        message: 'New Sub Category Created',
        data: category,
      })
    } catch (err) {
      response.unauthorized({
        message: err.message,
        data: err,
      })
    }
  }

  public async productsInSubCategory({ request, response }: HttpContextContract) {
    // const { page = 1, limit = 10 } = request.qs()

    const categories = await this.subCategoryService.allProductsInSubCategory(
      request.param('sub_category_id')
    )
    response // const categories = (await ProductCategory.all()).slice(limit, page * limit)
      .ok({
        message: 'All products in Categories Found',
        data: categories,
      })
  }

  public async update({ request, bouncer, response }: HttpContextContract) {
    try {
      // Authorize only the admin to edit product category information
      await bouncer.authorize('isAdmin')
      const subCategory = await this.subCategoryService.findOne(request.param('id'))

      const updatedSCategory = await this.subCategoryService.update(subCategory, request)

      response.ok({
        message: `Category Updated #${request.param('id')}`,
        data: updatedSCategory,
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
      // Only an admin should be delete a ProductSubCategory from the system
      await bouncer.authorize('isAdmin')
      await this.subCategoryService.delete(request.param('id'))

      response.noContent()
    } catch (err) {
      response.badRequest({
        data: err,
        message: err.message,
      })
    }
  }
}
