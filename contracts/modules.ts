declare module '@ioc:MiniEcommerce/ProductService' {
  import ProductService from 'App/Services/ProductService'

  const ProductServices: ProductService
  export default ProductServices
}

declare module '@ioc:MiniEcommerce/UserService' {
  import UserService from 'App/Services/UserService'

  const UserServices: UserService
  export default UserServices
}
