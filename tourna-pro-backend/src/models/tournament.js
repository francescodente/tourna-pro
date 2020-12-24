const { mongo } = require('mongoose')
const { createSchema } = require('./model-utils')

module.exports = createSchema('Tournament', 'Tournaments', mongoose => ({
  name: String,
  description: String,
  date: Date,
  activity: mongoose.ObjectId,
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
      id: mongoose.ObjectId,
      status: String, // ACTIVE | RETIRED
    }
  ],
  matches: [
    {
      id: mongoose.ObjectId,
      participant1: {
        id: mongoose.ObjectId,
        score: Number,
      },
      participant2: {
        id: mongoose.ObjectId,
        score: Number,
      },
      notes: String,
      status: String, // PENDING | STARTED | ENDED
      date: Date
    }
  ],
  owners: [mongoose.ObjectId]
}))
