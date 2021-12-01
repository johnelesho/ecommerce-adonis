import ProductCategory from '../../app/Models/ProductCategory'
export default interface ProductCategoryInterface {
  index()
  create(data: any)
  update(category: ProductCategory, data: any)
}
