const { Tournament } = require('../models')
const { ok } = require('../utils/action-results')

exports.getOwners = async function(req) {
    let owners = await Tournament.findById(req.params.id).select('owners')
    return ok(owners)
}

exports.addOwner = async function(req) {
    let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, 
        {"$push": {"owners": req.body.userId}},
        {new: true})
    return ok(updatedTournament.owners);
}

exports.removeOwner = async function(req) {
    let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, 
        {"$pull": {"owners": req.params.userId}},
        {new: true})
    return ok(updatedTournament.owners);
}