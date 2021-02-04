const { matchBetween } = require('./utils')
const Activities = require('../activities')

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
    if (a == 0 && i != 0) {
      a = 1
    }
    let b = (idealSize - 2 - i + roundIndex) % (idealSize - 1) + 1
    if (a != size && b != size) {
      newRound.push(matchBetween(tournament.participants[a], tournament.participants[b]))
    }
  }
  return newRound
}

exports.getRoundCount = function(tournament) {
  if (tournament.participants.length % 2 == 0) {
    return tournament.participants.length - 1
  } else {
    return tournament.participants.length
  }
}

function compareStats(a, b) {
  for (let i = 0; i < a.length; i++) {
    let comparison = a[i].stat.compare(a[i].value, b[i].value)
    if (comparison != 0) {
      return comparison
    }
  }
  return 0
}

exports.generateRanking = function(tournament) {
  let stats = Activities.findById(tournament.activity).stats
  
  let ranking = tournament.participants
    .map(p => ({
      id: p.id,
      stats: stats.map(s => ({
        value: s.compute(tournament, p.id),
        stat: s
      }))
    }))
    .sort((a, b) => compareStats(b.stats, a.stats))
    .map(x => ({
      id: x.id,
      stats: x.stats.map(s => ({
        key: s.stat.key,
        value: s.value
      }))
    }))
    
  return {
    ranking,
    stats
  }
}