const { createSchema } = require('./model-utils')

module.exports = createSchema('Person', 'People', mongoose => ({
  firstName: String,
  lastName: String,
  telephone: String,
  birthDate: Date,
  gender: String, // M | F | OTHER
  city: String
}))
