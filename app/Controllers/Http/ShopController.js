const Shop = use('App/Models/Shop');

class ShopController {

  async addShop({ request, response, auth }) {
    // console.log(auth)
    const {shop_name, shop_type, email, about, logo, latitude, longitude } =  request.only(['shop_name', 'shop_type', 'email', 'about', 'logo', 'latitude', 'longitude']);
    try {
      const shop = await Shop.create({shop_name, shop_type, email, about, logo, latitude, longitude } );
      return response.send({ message: 'Shop has been created' });
    } catch (err) {
      response.status(401).send({ error: 'Please try again' });
    }
  }

  async disactivateShop({ request, response, auth }) {
    const shopId = request.only(['shop_id'])
    try {
      let disable_shop = await Shop.query().where('id',shopId.shop_id).update({ is_active: false })
      if(!disable_shop) throw "Error !";
      return response.send({ message: 'Shop has been disactivated successfully' });
    } catch (err) {
      response.status(401).send({ error: 'Please try again' });
    }
  }

  async activateShop({ request, response, auth }) {
    const shopId = request.only(['shop_id'])
    try {
      let disable_shop = await Shop.query().where('id',shopId.shop_id).update({ is_active: true })
      if(!disable_shop) throw "Error !";
      return response.send({ message: 'Shop has been activated successfully' });
    } catch (err) {
      response.status(401).send({ error: 'Please try again' });
    }
  }

  async getShops({ request, response, auth }) {
    try {
      return await Shop.query()
    }catch(err) {
      response.status(401).send({ error: 'Please try again' });
    }
  }
  
}

module.exports = ShopController
