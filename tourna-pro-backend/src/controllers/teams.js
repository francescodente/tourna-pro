const { Team } = require('../models')
const { ok, created, notFound, forbidden } = require('../utils/action-results')
const { setImage, imageUrl } = require('./image-utils')

function teamDto(team, req) {
  return {
    id: team._id,
    name: team.name,
    creatorId: team.creatorId,
    members: team.members,
    imageUrl: imageUrl(team.imageId, req)
  }
}

function notFoundMessage(id){
  return `Could not find team with id ${id}`
}


exports.createTeam = async function (req) {
  let teamModel = new Team({
    name: req.body.name,
    members: [req.userId],
    creatorId: req.userId
  })
  let team = await teamModel.save()
  return created(teamDto(team, req))
}

exports.getTeam = async function (req) {
  let team = await Team.findById(req.params.id)
  if (!team) {
    return notFound(notFoundMessage(req.params.id))
  }
  return ok(teamDto(team, req))
}

exports.getAllTeams = async function (req) {
  let filter = {}
  if(req.query.user){
    filter.members = req.query.user
  }
  if (req.query.teamIds) {
    filter._id = { $in: JSON.parse(req.query.teamIds) }
  }
  let allTeams = await Team.find(filter)
  return ok(allTeams.map(x=>teamDto(x, req)))
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
    name: req.body.name
  }, { new: true })
  return ok(teamDto(updatedTeam, req))
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
  return ok(teamDto(deleteTeam, req))
}

exports.setTeamImage = async function (req) {
  let team = await Team.findById(req.params.id)
  if(!team){
    return notFound(notFoundMessage(req.params.id))
  }
  if(!team.members.includes(req.userId)){
    return forbidden(`User with id ${req.userId} is not a member of team ${req.params.id}`)
  }
  return await setImage(req.file, team, req)
}