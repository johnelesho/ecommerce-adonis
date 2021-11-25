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
    Route.resource('products', 'ProductsController').apiOnly().only(['show', 'index'])
    Route.resource('products-category', 'ProductCategoriesController')
      .apiOnly()
      .only(['show', 'index'])
    Route.resource('products-sub-category', 'ProductSubCategoriesController')
      .apiOnly()
      .only(['show', 'index'])

    Route.resource('users', 'UsersController').apiOnly().only(['show'])
  })

  // Routes Requiring Authentication
  Route.group(() => {
    Route.post('/logout', 'AuthController.logout')
    Route.post('/me', 'AuthController.currentUser')

    // Authentication is required for a user to be updated and deleted
    // but not needed to register a new user or show all or individual user information
    Route.resource('users', 'UsersController').apiOnly().except(['store', 'show'])

    // Authentication is required to insert, update and delete a product
    // but not needed to show all or individual product information
    Route.resource('products', 'ProductsController').apiOnly().except(['show', 'index'])

    // Authentication is required to insert, update and delete a product category information
    // but not needed to show all or individual product category information

    Route.resource('products-category', 'ProductCategoriesController')
      .apiOnly()
      .except(['show', 'index'])

    // Authentication is required to insert, update and delete a product sub category information
    // but not needed to show all or individual product sub category information
    Route.resource('products-sub-category', 'ProductSubCategoriesController')
      .apiOnly()
      .except(['show', 'index'])
  }).middleware('auth')
  // .middleware('auth:auth,api')
}).prefix('api/v1')
