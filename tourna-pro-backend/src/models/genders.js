const values = ['M', 'F', 'NONE']

exports.genderExists = function(gender){
  return values.includes(gender)
}

exports.genders = values