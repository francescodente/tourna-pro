const { Team } = require('../models')
const { ok, created, notFound, forbidden } = require('../utils/action-results')
const { setImage, imageUrl } = require('./image-utils')

function teamDto(team, req) {
  return {
    id: team._id,
    name: team.name,
    membersCount: team.members.length,
    creatorId: team.creatorId,
    imageUrl: imageUrl(team.imageId, req)
  }
}

function notFoundMessage(id){
  return `Could not found team with id ${id}`
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

exports.getAllTeams = async function (req) {
  let query = Team.find()
  if(req.query.user){
    query = query.where({members: req.query.user})
  }
  let allTeams = await query
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
    name: req.body.name,
    membersCount: req.body.membersCount,
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