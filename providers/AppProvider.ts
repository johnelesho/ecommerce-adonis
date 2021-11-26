import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { default: ProductService } = await import('App/Services/ProductService')
    const { default: UserService } = await import('App/Services/UserService')
    this.app.container.singleton('MiniEcommerce/ProductService', () => new ProductService())
    this.app.container.singleton('MiniEcommerce/UserService', () => new UserService())
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
