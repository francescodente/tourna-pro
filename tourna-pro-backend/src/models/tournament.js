const { mongo, Mongoose } = require('mongoose')
const { createSchema } = require('./model-utils')

module.exports = createSchema('Tournament', 'Tournaments', mongoose => ({
  name: String,
  description: String,
  date: Date,
  activity: String,
  type: String, // ROUND_ROBIN | KNOCKOUT
  location: String,
  mode: String, // TEAMS | INDIVIDUAL
  maxAge: Number,
  minAge: Number,
  maxParticipants: Number,
  gender: String, // M | F | NONE
  visibility: String, // PUBLIC | PRIVATE
  status: String, // PENDING | ACTIVE | SUSPENDED | ENDED
  participants: [
    {
      id: [{type: mongoose.ObjectId, ref:'ParticipationRequest'}],
      status: String, // ACTIVE | RETIRED
    }
  ],
  matches: [
    {
      id: mongoose.ObjectId,
      participant1: {
        id: [{type: mongoose.ObjectId, ref:'ParticipationRequest'}],
        score: Number,
      },
      participant2: {
        id: [{type: mongoose.ObjectId, ref:'ParticipationRequest'}],
        score: Number,
      },
      notes: String,
      status: String, // PENDING | STARTED | ENDED
      date: Date
    }
  ],
  owners: [{type: mongoose.ObjectId, ref:'User'}]
}))
