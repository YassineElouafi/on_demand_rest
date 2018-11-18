'use strict'

const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('shop_id').unsigned().notNullable()
      table.integer('product_id').unsigned().notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
