import BaseService from './BaseService'
import ProductSubCategoryInterface from 'Contracts/interfaces/ProductSubCategory.Interface'
import ProductSubCategory from '../Models/ProductSubCategory'
import ProductSubCategoryValidator from 'App/Validators/ProductSubCategoryValidator'
import UpdateProductSubCategoryValidator from '../Validators/UpdateProductSubCategoryValidator'
// import ProductServices from '@ioc:MiniEcommerce/ProductService'
import CategoryService from './CategoryService'
import Product from '../Models/Product'

export default class SubCategoryService extends BaseService implements ProductSubCategoryInterface {
  protected categoryService: CategoryService

  constructor() {
    super(ProductSubCategory)
    this.categoryService = new CategoryService()
  }
  public async allProductsInSubCategory(subcategoryId: number) {
    // return await this.model.all()
    const product = Product.findBy('productSubCategoryId', subcategoryId)
    // await this.model.findOrFail(subcategoryId).related('productCategory').query()
    // .related('productCategory').query()
    // ProductCategory.related('')

    return product
  }
  public async index() {
    return await this.model.all()
  }
  public async delete(subcategoryId: number) {
    const subcategory = await this.model.findOrFail(subcategoryId)
    await subcategory.delete()
  }
  public async findOne(id: number): Promise<ProductSubCategory> {
    try {
      const subcategory = await this.model.findOrFail(id)

      return subcategory
    } catch (error) {
      throw error
    }
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
  public async update(subcategory: ProductSubCategory, data) {
    try {
      const payload = await data.validate(UpdateProductSubCategoryValidator)
      Object.assign(subcategory, payload)

      return await subcategory.save()
    } catch (err) {
      throw err
    }
  }
}
