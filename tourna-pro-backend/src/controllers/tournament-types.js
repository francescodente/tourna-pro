const { ok } = require('../utils/action-results')
const Types = require('../models/tournament-types')


exports.getAllTournamentsTypes = function (req) {
  return Promise.resolve(ok(Types))
}