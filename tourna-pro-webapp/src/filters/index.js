import store from '../store'
import notificationFormatters from './notification-formatters'
import teamLogFormatters from './team-log-formatters'
import tournamentLogFormatters from './tournament-log-formatters'

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

function format(log, formatters) {
  let formatter = formatters[log.type] || (() => `Evento di tipo '${log.type}' sconosciuto`)
  return formatter(log.parameters)
}

function gender(g) {
  switch (g) {
    case 'M': return 'Maschile'
    case 'F': return 'Femminile'
    default: return 'Misto'
  }
}

function profileGender(g) {
  switch (g) {
    case 'M': return 'Maschio'
    case 'F': return 'Femmina'
    default: return 'Preferisce non specificare'
  }
}

export default function (vue) {
  vue.filter('dateFormat', dateFormat)
  vue.filter('tournamentMode', tournamentMode)
  vue.filter('tournamentType', tournamentType)
  vue.filter('activityFromId', activityFromId)
  vue.filter('gender', gender),
  vue.filter('profileGender', profileGender)
  vue.filter('formatNotification', notification => format(notification, notificationFormatters))
  vue.filter('formatTeamLog', log => format(log, teamLogFormatters))
  vue.filter('formatTournamentLog', log => format(log, tournamentLogFormatters))
}