const compareScores = f => m => {
  const res = f(m.participant1.score, m.participant2.score)
  if (res > 0) {
    return m.participant1
  } else if (res < 0) {
    return m.participant2
  }
  return undefined
}

const higherScore = compareScores((a, b) => b - a)
const lowerScore = compareScores((a, b) => a - b)

const values = [
  {
    id: 'SOCCER',
    name: 'Calcio',
    determineWinner: higherScore
  },
  {
    id: 'CHESS',
    name: 'Scacchi',
    determineWinner: higherScore
  },
  {
    id: 'BRISCOLA',
    name: 'Briscola',
    determineWinner: higherScore
  },
  {
    id: 'BEER_PONG',
    name: 'Beer Pong',
    determineWinner: lowerScore
  },
  {
    id: 'BURACO',
    name: 'Burraco',
    determineWinner: higherScore
  },
  {
    id: 'BEACH_VOLLEY',
    name: 'Beach Volley',
    determineWinner: higherScore
  },
  {
    id: 'MTG',
    name: 'Magic The Gathering',
    determineWinner: higherScore
  },
  {
    id: 'YGO',
    name: 'Yu-Gi-Oh',
    determineWinner: higherScore
  }
]

exports.activityExists = function(a){
  return values.map(x=>x.id).includes(a)
}

exports.findById = function(id) {
  return values.find(x => x.id == id)
}

exports.activities = values