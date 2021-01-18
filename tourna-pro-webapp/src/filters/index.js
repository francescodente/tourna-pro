import store from '../store'
function dateFormat(date){
  var converted = new Date(date)
  return converted.toLocaleDateString()
}

function tournamentType(type){
  let t = store.getters.tournamentType(type)
  return t? t.name : "Sconosciuto"
}

function tournamentMode(mode) {
  switch (mode) {
    case 'INDIVIDUAL': return 'Individuale'
    case 'TEAMS': return 'A squadre'
    default: return 'Sconosciuto'
  }
}

function activityFromId(activityId){
  let a = store.getters.activity(activityId)
  return a? a.name : "Sconosciuto"
}

export default function (vue) {
  vue.filter('dateFormat', dateFormat)
  vue.filter('tournamentMode', tournamentMode)
  vue.filter('tournamentType', tournamentType)
  vue.filter('activityFromId', activityFromId)
}