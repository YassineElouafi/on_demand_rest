'use strict'

const Schema = use('Schema')

class ShopProductsSchema extends Schema {
  up () {
    this.create('shop_products', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('shop_id').unsigned().references('id').inTable('shops').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shop_products')
  }
}

module.exports = ShopProductsSchema
