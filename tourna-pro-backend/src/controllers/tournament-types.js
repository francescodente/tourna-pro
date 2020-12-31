const { ok } = require('../utils/action-results')
const {types} = require('../models/tournament-types')

function tournamentTypeDto(tournamentType) {
  return {
    id: tournamentType.id,
    name: tournamentType.name
  }
}

exports.getAllTournamentsTypes = function (req) {
  return Promise.resolve(ok(types.map(tournamentTypeDto)))
}