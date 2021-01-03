const { Team } = require('../models')
const { ok, created, notAllowed, notFound, forbidden } = require('../utils/action-results')

function teamDto(team) {
  return {
    id: team._id,
    name: team.name,
    membersCount: team.members.length,
    creatorId: team.creatorId
  }
}

function notFoundMessage(id){
  return `Could not found team with id ${id}`
}


exports.createTeam = async function (req) {
  let teamModel = new Team({
    name: req.body.name,
    members: [req.userId],
    creatorId: req.userId,
    imageUrl: ""
  })
  let team = await teamModel.save()
  return created(teamDto(team))
}

exports.getAllTeams = async function (req) {
  let query = Team.find()
  if(req.query.user){
    query = query.where({members: req.query.user})
  }
  let allTeams = await query
  return ok(allTeams.map(x=>teamDto(x)))
}

exports.updateTeam = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return forbidden(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    membersCount: req.body.membersCount,
  }, { new: true })
  return ok(teamDto(updatedTeam))
}

exports.deleteTeam = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(team.creatorId != req.userId){
    return forbidden(`User with id ${req.userId} is not the creator of team ${req.params.id}`)
  } 
  let deleteTeam = await Team.findByIdAndRemove(req.params.id)
  return ok(teamDto(deleteTeam))
}

exports.setTeamImage = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return forbidden(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  return notImplemented()
}