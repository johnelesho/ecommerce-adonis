import ProductInterface from 'Contracts/interfaces/Product.Interface'
import BaseService from './BaseService'
import Product from '../Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'
import User from '../Models/User'
import UpdateProductValidator from '../Validators/UpdateProductValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class ProductService extends BaseService implements ProductInterface {
  constructor() {
    super(Product)
  }

  public async productsByUser(user: User) {
    const products = await user.related('products').query()
    return products
  }

  public async delete(productId: number) {
    const product = await this.model.findOrFail(productId)
    await product.delete()
  }

  public async index() {
    return await Product.all()
  }
  public async findOne(id: number): Promise<Product> {
    const product = await this.model.findOrFail(id)

    return product
  }
  public async create(user: User, data: { validate: (arg0: typeof ProductValidator) => any }) {
    try {
      const payload = await data.validate(ProductValidator)
      // const product = await Product.create({ ...payload, userId: userId })
      // const category = await ProductCategory.findOrFail(categoryId)
      // // ProductCategory.table
      // await category.related('products').create({ ...payload })
      const product = await user.related('products').create({ ...payload })

      // create({ ...payload })
      // .related('productCategoryId')
      // .save()
      // .related('product').sa

      return product
    } catch (error) {
      throw error
    }
  }
  public async update(product: Product, data: RequestContract): Promise<Product> {
    try {
      const payload = await data.validate(UpdateProductValidator)
      Object.assign(product, payload)

      return await product.save()
    } catch (err) {
      throw err
    }
  }
}
