'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('shop_id').notNullable().unique()
      table.string('price').notNullable()
      table.string('delay')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
