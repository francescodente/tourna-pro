const { Tournament } = require("../models")
const { notFound, ok } = require("../utils/action-results")
const TournamentTypes = require('../models/tournament-types')

exports.getTournamentRanking = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return notFound(`Unable to find tournament with id ${req.params.id}`)
  }
  let tournamentType = TournamentTypes.findById(tournament.type)
  return ok(tournamentType.generateRanking(tournament))
}