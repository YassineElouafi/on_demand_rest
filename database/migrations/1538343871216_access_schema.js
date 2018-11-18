'use strict'

const Schema = use('Schema')

class AccessSchema extends Schema {
  up () {
    this.create('accesses', (table) => {
      table.increments()
      table.string('username', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('isActive').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('accesses')
  }
}

module.exports = AccessSchema
