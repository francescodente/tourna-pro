const { createSchema } = require('./model-utils')

module.exports = createSchema('User', 'Users', mongoose => ({
  username: String,
  email: String,
  password: String,
  salt: String,
  imageUrl: String,
  person: [{type: mongoose.ObjectId, ref:'Person'}],
  interests: [String],
  unlockedAchievements: [String]
}))
