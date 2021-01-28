const { points, pointsScored, pointsTaken, scoreDifference, wins, losses, draws } = require("./stats")

const isRetired = tournament => participant => participant.id == null || tournament.participants.find(x => x.id == participant.id) == 'RETIRED'

const compareScores = f => function(match, tournament) {
  let score = {
    participant1: match.participant1.score,
    participant2: match.participant2.score
  }
  if (score.participant1 == undefined || score.participant2 == undefined) {
    const isRetiredFromThisTournament = isRetired(tournament)
    if (isRetiredFromThisTournament(match.participant1)) {
      score.participant1 = this.defaultLosingScore
      score.participant2 = this.defaultWinningScore
    } else if (isRetiredFromThisTournament(match.participant2)) {
      score.participant1 = this.defaultWinningScore
      score.participant2 = this.defaultLosingScore
    } else {
      return null
    }
  }
  const compare = f(score.participant1, score.participant2)
  let winner = null
  let loser = null
  if (compare > 0) {
    winner = 'participant1'
    loser = 'participant2'
  } else if (compare < 0) {
    winner = 'participant2'
    loser = 'participant1'
  }
  return {
    participant1: {
      id: match.participant1.id,
      score: score.participant1
    },
    participant2: {
      id: match.participant2.id,
      score: score.participant2
    },
    outcome: winner || 'draw',
    winner,
    loser,
  }
}

const lowerScore = compareScores((a, b) => b - a)
const higherScore = compareScores((a, b) => a - b)

const defaultResult = (defaultWinningScore, defaultLosingScore) => ({
  defaultWinningScore,
  defaultLosingScore
})


const fixedPoints = (win, draw, loss) => ({
  assignPoints(result, participantKey) {
    if (result.outcome == 'draw') {
      return draw
    }
    return result.winner == participantKey ? win : loss
  }
})

const defaultFixedPoints = fixedPoints(3, 1, 0)

const values = [
  {
    id: 'SOCCER',
    name: 'Calcio',
    achievement: 'GOLEADOR',
    getMatchResult: higherScore,
    ...defaultResult(3, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi'),
      pointsScored('Gol Fatti'),
      pointsTaken('Gol Subiti'),
      scoreDifference('Differenza Reti')
    ]
  },
  {
    id: 'CHESS',
    name: 'Scacchi',
    achievement: 'GRAN_MAESTRO_DEGLI_SCACCHI',
    getMatchResult: higherScore,
    ...defaultResult(1, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi')
    ]
  },
  {
    id: 'BRISCOLA',
    name: 'Briscola',
    achievement: 'SEI_UN_ASSO',
    getMatchResult: higherScore,
    ...defaultResult(2, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi')
    ]
  },
  {
    id: 'BEER_PONG',
    name: 'Beer Pong',
    achievement: 'CECCHINO_UBRIACONE',
    getMatchResult: higherScore,
    ...defaultResult(6, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi'),
      pointsScored('Bicchieri centrati'),
      pointsTaken('Bicchieri bevuti'),
      scoreDifference('Differenza bicchieri')
    ]
  },
  {
    id: 'BURACO',
    name: 'Burraco',
    achievement: 'THE_JOKER',
    getMatchResult: higherScore,
    ...defaultResult(2005, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi'),
      pointsScored('Punti fatti'),
      scoreDifference('Differenza punti')
    ]
  },
  {
    id: 'BEACH_VOLLEY',
    name: 'Beach Volley',
    achievement: 'RE_DELLA_SPIAGGIA',
    getMatchResult: higherScore,
    ...defaultResult(2, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi')
    ]
  },
  {
    id: 'MTG',
    name: 'Magic The Gathering',
    achievement: 'LOTO_NERO',
    getMatchResult: higherScore,
    ...defaultResult(2, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi')
    ]
  },
  {
    id: 'YGO',
    name: 'Yu-Gi-Oh',
    achievement: 'PUZZLE_DEL_MILLENNIO',
    getMatchResult: higherScore,
    ...defaultResult(2, 0),
    ...defaultFixedPoints,
    stats: [
      points('Punti'),
      wins('Vittorie'),
      losses('Sconfitte'),
      draws('Pareggi')
    ]
  }
]

exports.activityExists = function(a){
  return values.map(x=>x.id).includes(a)
}

exports.findById = function(id) {
  return values.find(x => x.id == id)
}

exports.activities = values