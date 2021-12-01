import ProductCategoryInterface from '../../contracts/interfaces/ProductCategory.Interface'
import ProductCategory from '../Models/ProductCategory'
import BaseService from './BaseService'
import ProductCategoryValidator from '../Validators/ProductCategoryValidator'
import UpdateProductCategoryValidator from 'App/Validators/UpdateProductCategoryValidator'
// import Product from '../Models/Product'

export default class CategoryService extends BaseService implements ProductCategoryInterface {
  constructor() {
    super(ProductCategory)
  }
  public async allSubCategories(categoryId: number) {
    // return await this.model.all()
    const category = (await this.model.findOrFail(categoryId))
      .related('productSubCategories')
      .query()
    // ProductCategory.related('')

    return category
  }
  public async allProductsInCategory(categoryId: number) {
    // return await this.model.all()
    const product = (await this.model.findOrFail(categoryId)).related('products').query()
    // ProductCategory.related('')

    return product
  }
  public async index() {
    return await this.model.all()
  }
  public async delete(userId: number) {
    const user = await this.model.findOrFail(userId)
    await user.delete()
  }
  public async findOne(id: number): Promise<ProductCategory> {
    const user = await this.model.findOrFail(id)

    return user
  }

  public async create(data: { validate: (arg0: typeof ProductCategoryValidator) => any }) {
    try {
      // const product = await Product.findOrFail(productId)
      const payload = await data.validate(ProductCategoryValidator)
      const category = this.model.create({ ...payload })
      // save(payload)

      return category
    } catch (error) {
      throw error
    }
  }
  public async update(category: ProductCategory, data) {
    try {
      const payload = await data.validate(UpdateProductCategoryValidator)
      Object.assign(category, payload)

      return await category.save()
    } catch (err) {
      throw err
    }
  }
}
