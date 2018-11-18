'use strict'

const Schema = use('Schema')

class PagesSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('link', 250).notNullable()
      table.string('roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PagesSchema
