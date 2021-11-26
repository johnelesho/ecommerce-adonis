import ProductInterface from 'Contracts/interfaces/Product.Interface'
import BaseService from './BaseService'
import Product from '../Models/Product'
import User from 'App/Models/User'

export default class ProductService extends BaseService implements ProductInterface {
  constructor() {
    super(Product)
  }
  async index() {
    throw new Error('Method not implemented.')
  }
  async create(user: User, product: Product) {
    throw new Error('Method not implemented.')
  }
  async update(post_id: number, product: Product): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
