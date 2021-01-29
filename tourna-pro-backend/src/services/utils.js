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

exports.findAllParticipantsGroupedByRequest = async function (tournament, predicate = () => true) {
  let requests = await ParticipationRequest.aggregate([
    {
      $match: {
        _id: { $in: tournament.participants.filter(predicate).map(p => p.id) }
      }
    },
    {
      $lookup: {
        from: 'Teams',
        localField: 'teamId',
        foreignField: '_id',
        as: 'team'
      }
    }
  ])

  let map = {}
  for (let req of requests) {
    let ids = []
    if (req.team) {
      ids = {
        users: req.team.members,
        request: req
      }
    } else if (req.userId) {
      ids = {
        users: [req.userId],
        request: req
      }
    }
    map[req._id.toString()] = ids
  }
  return map
}