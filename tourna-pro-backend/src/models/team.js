const { createSchema } = require('./model-utils')

module.exports = createSchema('Team', 'Teams', mongoose => ({
  name: String,
  imageUrl: String,
  members: [{type: mongoose.ObjectId, ref:'User'}],
  creatorId: [{type: mongoose.ObjectId, ref:'User'}]
}))
