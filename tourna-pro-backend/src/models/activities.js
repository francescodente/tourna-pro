const values = [
  {
    id: 'VOLLEYBALL',
    name: 'Pallavolo'
  },
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
  }
]

exports.activityExists = function(a){
  return values.map(x=>x.id).includes(a)
}

exports.activities = values