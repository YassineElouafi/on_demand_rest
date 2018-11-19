const Shop = use('App/Models/Shop');

class ShopController {
  async addShop({ request, response, auth }) {
    // const {shop_name, shop_type, email, about, logo, latitude, longitude } =  request.only(['shop_name', 'shop_type', 'email', 'about', 'logo', 'latitude', 'longitude']);
    // try {
    //   const shop = await Shop.create({shop_name, shop_type, email, about, logo, latitude, longitude } );
    //   return response.send({ message: 'Shop has been created' });
    // } catch (err) {
    //   response.status(401).send({ error: 'Please try again' });
    // }
    console.log(auth)
  }
  
}

module.exports = ShopController
