const Activities = require('./activities')
const mongoose = require('mongoose')

function matchBetween(a, b) {
  return {
    id: mongoose.Types.ObjectId(),
    participant1: { id: a.id },
    participant2: { id: b.id },
    status: 'PENDING'
  }
}

function shuffle(array) {
  let copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy
}

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
    result.push(shuffled[i + idealSize / 2] || null)
  }
}

const values = [
  {
    id: 'ROUND_ROBIN',
    name: "All'italiana",
    generateNewRound(tournament) {
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
    },
    getRoundCount(tournament) {
      return tournament.participants.length - 1
    }
  }, 
  {
    id: 'KNOCKOUT',
    name: "Eliminazione diretta",
    generateNewRound(tournament) {
      let activity = Activities.findById(tournament.activity)
      let rounds = tournament.rounds
      let lastRound = rounds[rounds.length - 1]
      let lastRoundWinners = lastRound
        ? lastRound.map(m => activity.determineWinner(m))
        : shuffleAndPad(tournament.participants)

      let newRound = []
      for (let i = 0; i < lastRoundWinners.length; i += 2) {
        newRound.push({
          id: mongoose.Types.ObjectId(),
          participant1: { id: lastRoundWinners[i] },
          participant2: { id: lastRoundWinners[i+1] },
          status: 'PENDING'
        })
      }
    },
    getRoundCount(tournament) {
      return Math.ceil(Math.log2(tournament.participants.length))
    }
  }
]

exports.typeExists = function(t) {
  return values.map(x=>x.id).includes(t)
}

exports.findById = function(id) {
  return values.find(x => x.id == id)
}

exports.types = values