const { createSchema } = require('./model-utils')

module.exports = createSchema('Log', 'Logs', mongoose => ({
  teamId: {type: mongoose.ObjectId, ref:'Team'},
  tournamentId: {type: mongoose.ObjectId, ref:'Tournament'},
  type: String,
  date: Date,
  parameters: {},
  readBy: [{type: mongoose.ObjectId, ref:'User'}],
  recipients: [{type: mongoose.ObjectId, ref:'User'}]
}))
