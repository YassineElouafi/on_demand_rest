'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

Route.get('/', ({ request }) => {
  return { greeting: 'ODA Api' }
});

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/
Route.group(() => {
  /*
  |--------------------------------------------------------------------------
  | API - Shop
  |--------------------------------------------------------------------------
  */

  Route.post('/shop/new', 'ShopController.addShop');
  Route.post('/shop/activate', 'ShopController.activateShop');
  Route.post('/shop/disactivate', 'ShopController.disactivateShop');
  Route.get('/shop/getShops', 'ShopController.getShops');


}).prefix('api/v1');


Route.group(() => {
  /*
  |--------------------------------------------------------------------------
  | API - Authentication
  |--------------------------------------------------------------------------
  */
  Route.post('/auth/sign-in', 'Api/AuthController.signIn');
  Route.post('/auth/register', 'Api/AuthController.register');
  Route.post('/auth/token/refresh', 'Api/AuthController.refreshToken');
  Route.post('/auth/logout', 'Api/AuthController.logout');

  /*
  |--------------------------------------------------------------------------
  | API - User
  |--------------------------------------------------------------------------
  */
  Route.get('/user/me', 'Api/UserController.getUser');
}).prefix('api/v1');
