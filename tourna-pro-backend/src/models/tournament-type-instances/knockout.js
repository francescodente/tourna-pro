const Activities = require('../activities')
const { matchBetween, shuffle } = require('./utils')

function powerOfTwoCeil(x) {
  return Math.pow(2, Math.ceil(Math.log2(x)))
}

function shuffleAndPad(participants) {
  let shuffled = shuffle(participants)
  let size = participants.length
  let idealSize = powerOfTwoCeil(size)
  let result = []
  for (let i = 0; i < idealSize / 2; i++) {
    result.push(shuffled[i])
    result.push(shuffled[i + idealSize / 2] || { id: null })
  }
  return result
}

exports.id = 'KNOCKOUT'

exports.name = "Eliminazione diretta"

exports.generateNewRound = function(tournament) {
  let activity = Activities.findById(tournament.activity)
  let rounds = tournament.matches
  let lastRound = rounds[rounds.length - 1]
  let lastRoundWinners = lastRound
    ? lastRound.map(m => activity.getMatchResult(m).winner)
    : shuffleAndPad(tournament.participants)

  let newRound = []
  for (let i = 0; i < lastRoundWinners.length; i += 2) {
    newRound.push(matchBetween(lastRoundWinners[i], lastRoundWinners[i+1]))
  }
  return newRound
}

exports.getRoundCount = function(tournament) {
  return Math.ceil(Math.log2(tournament.participants.length))
}

function getResult(activity, match) {
  if (match.participant1.score != undefined && match.participant2.score != undefined) {
    return activity.getMatchResult(match)
  } else {
    return {
      winner: match.participant1,
      loser: match.participant2
    }
  }
}

function computeRankingForRound(activity, currentRound, subsequentRoundRanking) {
  let results = currentRound.map(m => getResult(activity, m))
  if (!subsequentRoundRanking) {
    return [
      ...results.map(r => r.winner.id),
      ...results.map(r => r.loser.id)
    ]
  } else {
    return results
      .map(r => ({
        id: r.loser.id,
        winnerRank: subsequentRoundRanking.findIndex(x => x.id == r.winner.id)
      }))
      .sort((a, b) => a.winnerRank - b.winnerRank)
      .map(x => x.id)
  }
}

function computeRankingForRoundIndex(activity, tournament, index, subsequentRoundRanking) {
  if (index == -1) {
    return []
  }
  let currentRound = tournament.matches[index]
  let currentRanking = computeRankingForRound(activity, currentRound, subsequentRoundRanking)
  return [
    ...currentRanking,
    ...computeRankingForRoundIndex(activity, tournament, index - 1, currentRanking)
  ]
}

exports.generateRanking = function(tournament) {
  if (tournament.matches.length == 0) {
    return tournament.participants.map(x => x.id)
  }
  let activity = Activities.findById(tournament.activity)
  return computeRankingForRoundIndex(activity, tournament, tournament.matches.length - 1)
    .filter(id => id != null)
    .map(id => ({
      id,
      stats: { }
    }))
}
