const { matchBetween } = require('./utils')
const Activities = require('./activities')

exports.id = 'ROUND_ROBIN'

exports.name = "All'italiana"

exports.generateNewRound = function(tournament) {
  let size = tournament.participants.length
  let idealSize = size % 2 == 0 ? size : size + 1
  let matchesCount = size / 2
  let roundIndex = tournament.matches.length
  
  let newRound = []
  for (let i = 0; i < matchesCount; i++) {
    let a = i == 0 ? 0 : (i + roundIndex) % idealSize
    let b = idealSize - i + roundIndex
    if (b < 0) {
      b += idealSize
    }
    if (a != size && b != size) {
      newRound.push(matchBetween(tournament.participants[a], tournament.participants[b]))
    }
  }
}

exports.getRoundCount = function(tournament) {
  return tournament.participants.length - 1
}

exports.generateRanking = function(tournament) {
  let activity = Activities.findById(tournament.activity)
  
}