const values = ['TEAMS', 'INDIVIDUAL']

exports.modeExists = function(mode){
  return values.includes(mode)
}

exports.modes = values