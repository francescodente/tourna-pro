const { Team } = require('../models')
const { ok, created } = require('../utils/action-results')
//TODO complete
function teamDto(team){
    return {
        id: team._id,
        name: team.name
    }
}
exports.createTeam = async function(req) {
    let teamModel = new Team({
        name: req.body.name,
        members: [req.body.creatorId],
        imageUrl: ""
    })
    let team = await teamModel.save()
    return created(teamDto(team))
}

exports.getAllTeams = async function(req) {

}

exports.updateTeam = async function(req) {

}

exports.deleteTeam = async function(req) {

}

exports.setTeamImage = async function(req) {

}