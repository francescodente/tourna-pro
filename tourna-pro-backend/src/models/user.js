const { createSchema } = require('./model-utils')

module.exports = createSchema('User', 'Users', mongoose => ({
  username: String,
  email: String,
  password: String,
  salt: String,
  imageUrl: String,
  person: mongoose.ObjectId,
  interests: [mongoose.ObjectId],
  unlockedAchievements: [String]
}))
