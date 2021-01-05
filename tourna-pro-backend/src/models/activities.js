const values = [
  {
    id: 'SOCCER',
    name: 'Calcio'
  },
  {
    id: 'CHESS',
    name: 'Scacchi'
  },
  {
    id: 'BRISCOLA',
    name: 'Briscola'
  },
  {
    id: 'BEER_PONG',
    name: 'Beer Pong'
  },
  {
    id: 'BURACO',
    name: 'Burraco'
  },
  {
    id: 'BEACH_VOLLEY',
    name: 'Beach Volley'
  },
  {
    id: 'MTG',
    name: 'Magic The Gathering'
  },
  {
    id: 'YGO',
    name: 'Yu-Gi-Oh'
  }
]

exports.activityExists = function(a){
  return values.map(x=>x.id).includes(a)
}

exports.activities = values