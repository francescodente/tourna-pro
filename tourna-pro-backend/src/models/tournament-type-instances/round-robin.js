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

function compareStats(a, b) {
  for (let i = 0; i < a.length; i++) {
    let comparison = a[i].stat.compare(a[i].value, b[i].value)
    if (comparison != 0) {
      return comparison
    }
  }
  return 0
}

function statsArrayToObject(stats) {
  let obj = { }
  for (let stat of stats) {
    obj[stat.name] = stat
  }
  return obj
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
    .sort((a, b) => compareStats(a.stats, b.stats))
    .map(x => ({
      id: x.id,
      stats: x.stats.map(s => ({
        key: s.name,
        value: s.value
      }))
    }))
    
  return {
    ranking,
    stats: statsArrayToObject(stats)
  }
}