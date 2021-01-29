const { Team } = require('../models')
const { publish } = require('../services/event-bus')
const { ok, notFound, forbidden, notImplemented } = require('../utils/action-results')

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
    return forbidden(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { $addToSet: { members: req.body.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(notFoundMessage(req.params.id))
  }
  publish('memberAdded', updatedTeam, req.body.userId, req.userId)
  return ok(teamMembersDto(updatedTeam));
}

exports.removeMember = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return forbidden(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  if(team.creatorId == req.params.userId){
    if(team.members.length > 1) {
      team.creatorId = team.members.filter(x => x.toString() != req.params.userId.toString())[0]
      await team.save()
    } else {
      return forbidden(`User with id ${req.userId} is the last member of the team`)
    }
  }
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id,
    { $pull: { members: req.params.userId } },
    { new: true })
  if (!updatedTeam) {
    return notFound(notFoundMessage(req.params.id))
  }
  publish('memberRemoved', updatedTeam, req.params.userId, req.userId)
  return ok(teamMembersDto(updatedTeam));
}