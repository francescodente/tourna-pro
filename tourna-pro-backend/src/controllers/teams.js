const { Team } = require('../models')
const { ok, created } = require('../utils/action-results')

function teamDto(team) {
  return {
    id: team._id,
    name: team.name,
    membersCount: 0,
    creatorId: team.creatorId
  }
}

exports.createTeam = async function (req) {
  let teamModel = new Team({
    name: req.body.name,
    members: [req.body.creatorId],
    imageUrl: ""
  })
  let team = await teamModel.save()
  return created(teamDto(team))
}

exports.getAllTeams = async function (req) {
  let allTeams = await Team.findById(req.params.id).select('teams')
  return ok(allTeams)
}

exports.updateTeam = async function (req) {
  let updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    membersCount: req.body.membersCount,
    creatorId: req.body.creatorId
  }, { new: true })
  return ok(teamDto(updatedTeam))
}

exports.deleteTeam = async function (req) {
  let deleteTeam = await Team.findeByIdAndRemove(req.params.id)
  return ok(teamDto(deleteTeam))
}

exports.setTeamImage = async function (req) {
  return notImplemented()
}