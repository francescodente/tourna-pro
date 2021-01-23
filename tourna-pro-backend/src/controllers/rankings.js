const { Tournament } = require("../models")
const { notFound } = require("../utils/action-results")

exports.getTournamentRanking = async function (req) {
  let tournament = Tournament.findById(req.params.id)
  if (!tournament) {
    return notFound(`Unable to find tournament with id ${req.params.id}`)
  }
  
}