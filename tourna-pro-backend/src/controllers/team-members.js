const { Team } = require('../models')
const { ok } = require('../utils/action-results')

exports.getTeamMembers = async function(req) {
    let teamMembers = await Team.findById(req.params.id).select('members')
    return ok(teamMembers)
}

exports.addMember = async function(req) {
    let updatedTeam = await Team.findByIdAndUpdate(req.params.id, 
        {"$push": {"members": req.body.userId}},
        {new: true})
    return ok(updatedTeam.members);
}

exports.removeMember = async function(req) {
    let updatedTeam = await Team.findByIdAndUpdate(req.params.id, 
        {"$pull": {"members": req.params.userId}},
        {new: true})
    return ok(updatedTeam.members);
}