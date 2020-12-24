const { createSchema } = require('./model-utils')

module.exports = createSchema('Activity', 'Activities', mongoose => ({
  name: String
}))
