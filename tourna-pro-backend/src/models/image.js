const { createSchema } = require('./model-utils')

module.exports = createSchema('Image', 'Images', mongoose => ({
  mime: String,
  data: Buffer
}))
