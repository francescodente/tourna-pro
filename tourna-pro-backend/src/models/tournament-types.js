const values = [
    {
      id: 'ROUND_ROBIN',
      name: 'Round robin'
    }, 
    {
      id: 'KNOCKOUT',
      name: 'Knockout'
    }
]

exports.typeExists = function(t){
  return values.map(x=>x.id).includes(t)
}

exports.types = values