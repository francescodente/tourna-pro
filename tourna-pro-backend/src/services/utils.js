const { ParticipationRequest, Team } = require("../models")

exports.findAllParticipants = async function (tournament, predicate = () => true) {
  let requests = await ParticipationRequest.find({
    _id: { $in: tournament.participants.filter(predicate).map(p => p.id) }
  })
  let teams = await Team.find({
    _id: { $in: requests.filter(r => r.teamId).map(r => r.teamId) }
  })
  return [
    ...teams.flatMap(t => t.members),
    ...requests.filter(r => r.userId).map(r => r.userId)
  ]
}