const { createSchema } = require('./model-utils')

module.exports = createSchema('ParticipationRequest', 'ParticipationRequests', mongoose => ({
  status: String,
  personId: mongoose.ObjectId,
  userId: mongoose.ObjectId,
  teamId: mongoose.ObjectId,
  tournamentId: mongoose.ObjectId
}))
