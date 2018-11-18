'use strict'

const Schema = use('Schema')

class ShopsSchema extends Schema {
  up () {
    this.create('shops', (table) => {
      table.increments()
      table.string('shop_name', 80).notNullable().unique()
      table.string('shop_type').notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('about', 254).notNullable().unique()
      table.string('access_id').notNullable().unique()
      table.string('logo').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shops')
  }
}

module.exports = ShopsSchema
