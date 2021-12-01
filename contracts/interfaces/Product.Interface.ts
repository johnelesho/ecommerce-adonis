import Product from '../../app/Models/Product'
import User from '../../app/Models/User'
export default interface ProductInterface {
  index()
  create(user: User, data: any)
  update(product: Product, data: any)
  findOne(id: number)
}
