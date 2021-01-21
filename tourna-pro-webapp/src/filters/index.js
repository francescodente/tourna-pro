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

export default function (vue) {
  vue.filter('dateFormat', dateFormat)
  vue.filter('tournamentMode', tournamentMode)
  vue.filter('tournamentType', tournamentType)
  vue.filter('activityFromId', activityFromId)
  vue.filter('formatNotification', notification => format(notification, notificationFormatters))
  vue.filter('formatTeamLog', log => format(log, teamLogFormatters))
  vue.filter('tournamentLogFormatters', log => format(log, tournamentLogFormatters))
}