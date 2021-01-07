const { createSchema } = require('./model-utils')

module.exports = createSchema('Team', 'Teams', mongoose => ({
  name: String,
  imageId: {type: mongoose.ObjectId, ref:'Image'},
  members: [{type: mongoose.ObjectId, ref:'User'}],
  creatorId: [{type: mongoose.ObjectId, ref:'User'}]
}))
