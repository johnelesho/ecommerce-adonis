import User from 'App/Models/User'
import Product from '../../app/Models/Product'
export default interface ProductInterface {
  index()
  create(user: User, product: Product)
  update(post_id: number, product: Product): Promise<boolean>
}
