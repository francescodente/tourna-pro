const { Tournament } = require('../models')
const { publish } = require('../services/event-bus')
const { ok, notFound } = require('../utils/action-results')

function errorMessage(id) {
  return `Could not found tournament with id ${id}`
}

function ownersDTO(res){
  return res.owners
}

exports.getOwners = async function (req) {
  let owners = await Tournament.findById(req.params.id).select('owners')
  if (!owners) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(ownersDTO(owners))
}

exports.addOwner = async function (req) {
  let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id,
    { $addToSet: { owners: req.body.userId } },
    { new: true })
  if (!updatedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  publish('ownerAdded', req.body.userId, updatedTournament, req.userId)
  return ok(updatedTournament.owners);
}

exports.removeOwner = async function (req) {
  let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id,
    { $pull: { owners: req.params.userId } },
    { new: true })
  if (!updatedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  publish('ownerRemoved', req.params.userId, updatedTournament, req.userId)
  return ok(updatedTournament.owners);
}