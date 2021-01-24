const { createSchema } = require('./model-utils')

module.exports = createSchema('User', 'Users', mongoose => ({
  username: String,
  email: String,
  password: String,
  salt: String,
  imageId: {type: mongoose.ObjectId, ref:'Image'},
  firstName: String,
  lastName: String,
  telephone: String,
  birthDate: Date,
  gender: String, // M | F | OTHER
  city: String,
  interests: [String],
  unlockedAchievements: [String]
}))
