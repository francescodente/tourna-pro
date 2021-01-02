const { createSchema } = require('./model-utils')

module.exports = createSchema('ParticipationRequest', 'ParticipationRequests', mongoose => ({
  status: String,
  personId: [{type: mongoose.ObjectId, ref:'Person'}],
  userId: [{type: mongoose.ObjectId, ref:'User'}],
  teamId: [{type: mongoose.ObjectId, ref:'Team'}],
  tournamentId: [{type: mongoose.ObjectId, ref:'Tournament'}]
}))
