declare module '@ioc:MiniEcommerce/CategoryService' {
  import CategoryService from 'App/Services/CategoryService'
  const CategoryServices: CategoryService
  export default CategoryServices
}

declare module '@ioc:MiniEcommerce/UserService' {
  import UserService from 'App/Services/UserService'

  const UserServices: UserService
  export default UserServices
}
declare module '@ioc:MiniEcommerce/Service' {
  import UserService from 'App/Services/UserService'
  import ProductService from 'App/Services/ProductService'
  import SubCategoryService from 'App/Services/SubCategoryService'
  import CategoryService from 'App/Services/CategoryService'

  export { UserService, ProductService, SubCategoryService, CategoryService }
}
