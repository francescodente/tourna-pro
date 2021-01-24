const compareScores = f => m => {
  if (m.participant1.score == undefined || m.participant2.score == undefined) {
    return null
  }
  const res = f(m.participant1.score, m.participant2.score)
  if (res > 0) {
    return {
      winner: m.participant1,
      loser: m.participant2,
      draw: false
    }
  } else if (res < 0) {
    return {
      winner: m.participant2,
      loser: m.participant1,
      draw: false
    }
  }
  return { draw: true }
}

const lowerScore = compareScores((a, b) => b - a)
const higherScore = compareScores((a, b) => a - b)

const values = [
  {
    id: 'SOCCER',
    name: 'Calcio',
    getMatchResult: higherScore
  },
  {
    id: 'CHESS',
    name: 'Scacchi',
    getMatchResult: higherScore
  },
  {
    id: 'BRISCOLA',
    name: 'Briscola',
    getMatchResult: higherScore
  },
  {
    id: 'BEER_PONG',
    name: 'Beer Pong',
    getMatchResult: lowerScore
  },
  {
    id: 'BURACO',
    name: 'Burraco',
    getMatchResult: higherScore
  },
  {
    id: 'BEACH_VOLLEY',
    name: 'Beach Volley',
    getMatchResult: higherScore
  },
  {
    id: 'MTG',
    name: 'Magic The Gathering',
    getMatchResult: higherScore
  },
  {
    id: 'YGO',
    name: 'Yu-Gi-Oh',
    getMatchResult: higherScore
  }
]

exports.activityExists = function(a){
  return values.map(x=>x.id).includes(a)
}

exports.findById = function(id) {
  return values.find(x => x.id == id)
}

exports.activities = values