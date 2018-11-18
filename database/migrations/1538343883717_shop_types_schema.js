'use strict'

const Schema = use('Schema')

class ShopTypesSchema extends Schema {
  up () {
    this.create('shop_types', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('shop_types')
  }
}

module.exports = ShopTypesSchema
