const { Team } = require('../models')
const { ok, notFound } = require('../utils/action-results')

function notFoundMessage(id) {
  return `Can not found team with id ${id}`
}

function teamMembersDto(members){
  return members.members
}

exports.getTeamMembers = async function (req) {
  let teamMembers = await Team.findById(req.params.id).select('members')
  if (!teamMembers) {
    return notFound(notFoundMessage(req.params.id))
  }
  return ok(teamMembersDto(teamMembers))
}

exports.addMember = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return notAllowed(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { $addToSet: { members: req.body.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(notFoundMessage(req.params.id))
  }
  return ok(teamMembersDto(updatedTeam));
}

exports.removeMember = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return notAllowed(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  if(team.creatorId == req.params.userId){
    return notAllowed(`User with id ${req.params.userId} is the creator of team ${req.params.id} and cannot be removed`)
  }
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { $pull: { members: req.params.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(notFoundMessage(req.params.id))
  }
  return ok(teamMembersDto(updatedTeam));
}