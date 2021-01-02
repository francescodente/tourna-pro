const values = ['TEAMS', 'INDIVIDUAL']

exports.modeExists = function(mode){
  return values.includes(mode)
}

exports.isIndividual = function(mode) {
  return mode == values[1]
}

exports.isTeam = function(mode){
  return mode == values[0]
}

exports.modes = values