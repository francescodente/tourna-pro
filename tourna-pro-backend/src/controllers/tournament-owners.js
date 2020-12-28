const { Tournament } = require('../models')
const { ok, notFound } = require('../utils/action-results')

function errorMessage(id) {
  return `Could not found tournament with id ${id}`
}

exports.getOwners = async function (req) {
  let owners = await Tournament.findById(req.params.id).select('owners')
  if (!owners) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(owners)
}

exports.addOwner = async function (req) {
  let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id,
    { "$addToSet": { "owners": req.body.userId } },
    { new: true })
  if (!updatedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(updatedTournament.owners);
}

exports.removeOwner = async function (req) {
  let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id,
    { "$pull": { "owners": req.params.userId } },
    { new: true })
  if (!updatedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(updatedTournament.owners);
}