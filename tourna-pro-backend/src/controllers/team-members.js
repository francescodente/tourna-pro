const { Team } = require('../models')
const { ok, notFound } = require('../utils/action-results')

function errorMessage(id) {
  return `Can not found team with id ${id}`
}

exports.getTeamMembers = async function (req) {
  let teamMembers = await Team.findById(req.params.id).select('members')
  if (!teamMembers) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(teamMembers)
}

exports.addMember = async function (req) {
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { "$addToSet": { "members": req.body.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(updatedTeam.members);
}

exports.removeMember = async function (req) {
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { "$pull": { "members": req.params.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(updatedTeam.members);
}