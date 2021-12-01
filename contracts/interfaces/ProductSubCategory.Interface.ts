import ProductSubCategory from '../../app/Models/ProductSubCategory'
export default interface ProductSubCategoryInterface {
  index()
  create(categoryId: number, data: any)
  update(subCategory: ProductSubCategory, data: any)
}
