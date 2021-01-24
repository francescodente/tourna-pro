const { createSchema } = require('./model-utils')

module.exports = createSchema('ParticipationRequest', 'ParticipationRequests', mongoose => ({
  status: String, //PENDING | APPROVED | REJECTED
  type: String,
  participant: {
    name: String,
    telephone: String
  },
  userId: {type: mongoose.ObjectId, ref:'User'},
  teamId: {type: mongoose.ObjectId, ref:'Team'},
  tournamentId: {type: mongoose.ObjectId, ref:'Tournament'}
}))
