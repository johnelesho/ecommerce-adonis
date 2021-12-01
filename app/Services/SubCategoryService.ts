import BaseService from './BaseService'
import ProductSubCategoryInterface from 'Contracts/interfaces/ProductSubCategory.Interface'
import ProductSubCategory from '../Models/ProductSubCategory'
import ProductSubCategoryValidator from 'App/Validators/ProductSubCategoryValidator'
import UpdateProductSubCategoryValidator from '../Validators/UpdateProductSubCategoryValidator'
// import ProductServices from '@ioc:MiniEcommerce/ProductService'
import CategoryService from './CategoryService'

export default class SubCategoryService extends BaseService implements ProductSubCategoryInterface {
  protected categoryService: CategoryService

  constructor() {
    super(ProductSubCategory)
    this.categoryService = new CategoryService()
  }
  public async index() {
    return await this.model.all()
  }
  public async delete(userId: number) {
    const user = await this.model.findOrFail(userId)
    await user.delete()
  }
  public async findOne(id: number): Promise<ProductSubCategory> {
    const user = await this.model.findOrFail(id)

    return user
  }

  public async create(
    productId: number,
    data: { validate: (arg0: typeof ProductSubCategoryValidator) => any }
  ) {
    try {
      const payload = await data.validate(ProductSubCategoryValidator)
      const category = await this.categoryService.findOne(productId)
      const subcategory = category.related('productSubCategories').create({ ...payload })

      return subcategory
    } catch (error) {
      throw error
    }
  }
  public async update(product: ProductSubCategory, data) {
    try {
      const payload = await data.validate(UpdateProductSubCategoryValidator)
      Object.assign(product, payload)

      return await product.save()
    } catch (err) {
      throw err
    }
  }
}
