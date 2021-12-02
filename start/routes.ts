/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Public routes
  Route.group(() => {
    Route.post('/login', 'AuthController.login')

    Route.post('/register', 'AuthController.register')
    Route.shallowResource('products', 'ProductsController').apiOnly().only(['show', 'index'])
    Route.resource('category', 'ProductCategoriesController').apiOnly().only(['show', 'index'])
    Route.get('category/:category_id/products', 'ProductCategoriesController.productsInCategory')
    Route.get(
      'category/:category_id/subcategories',
      'ProductCategoriesController.getAllSubCategory'
    )

    Route.shallowResource('subcategory', 'ProductSubCategoriesController')
      .apiOnly()
      .only(['show', 'index'])
    Route.get(
      'subcategory/:sub_category_id/products',
      'ProductSubCategoriesController.productsInSubCategory'
    )

    Route.shallowResource('users', 'UsersController').apiOnly().only(['show'])
    Route.get('users/:userId/products', 'ProductsController.getAllProductsByUser')
  })

  // Routes Requiring Authentication
  Route.group(() => {
    Route.post('/logout', 'AuthController.logout')
    Route.post('/me', 'AuthController.currentUser')
    Route.get('me/products', 'ProductsController.getAllProductsByCurrentUser')

    // Authentication is required for a user to be updated and deleted
    // but not needed to register a new user or show all or individual user information
    Route.resource('users', 'UsersController').apiOnly().except(['store', 'show'])
    // Authentication is required to insert, update and delete a product
    // but not needed to show all or individual product information
    Route.shallowResource('products', 'ProductsController').apiOnly().except(['show', 'index'])

    // Authentication is required to insert, update and delete a product category information
    // but not needed to show all or individual product category information

    Route.shallowResource('category', 'ProductCategoriesController')
      .apiOnly()
      .except(['show', 'index'])
    // Route.shallowResource('category.products', 'ProductCategoriesController')
    //   .apiOnly()
    //   .except(['show', 'index'])

    // Authentication is required to insert, update and delete a product sub category information
    // but not needed to show all or individual product sub category information
    Route.shallowResource('category.subcategory', 'ProductSubCategoriesController')
      .apiOnly()
      .except(['show', 'index'])
  }).middleware('auth')
  // .middleware('auth:auth,api')
}).prefix('api/v1')
