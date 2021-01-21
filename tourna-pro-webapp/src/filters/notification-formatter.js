const formatters = {
  memberAdded(params) {
    return `${params.addedBy.name} ti ha aggiungto alla squadra ${params.team.name}`
  },
  memberRemoved(params) {
    return `${params.removedBy.name} ti ha rimosso dalla squadra ${params.team.name}`
  }
}

function format(type, params) {
  let formatter = formatters[type] || (() => `Evento di tipo '${type}' sconosciuto`)
  return formatter(params)
}

export default function(notification) {
  return format(notification.type, notification.parameters)
}