const roundRobin = require('./tournament-type-instances/round-robin')
const knockout = require('./tournament-type-instances/knockout')

const values = [
  roundRobin,
  knockout
]

exports.typeExists = function(t) {
  return values.map(x=>x.id).includes(t)
}

exports.findById = function(id) {
  return values.find(x => x.id == id)
}

exports.types = values