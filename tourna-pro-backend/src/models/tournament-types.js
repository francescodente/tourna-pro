const values = [
    {
      id: 'ROUND_ROBIN',
      name: "All'italiana"
    }, 
    {
      id: 'KNOCKOUT',
      name: "Eliminazione diretta"
    }
]

exports.typeExists = function(t){
  return values.map(x=>x.id).includes(t)
}

exports.types = values