const { createSchema } = require('./model-utils')

module.exports = createSchema('Team', 'Teams', mongoose => ({
  name: String,
  imageUrl: String,
  members: [mongoose.ObjectId],
  creatorId: mongoose.ObjectId
}))
