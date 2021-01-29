export default {
  memberAdded(params) {
    return `${params.addedBy.name} ha aggiunto ${params.added.name} alla squadra.`
  },
  memberRemoved(params) {
    if (params.removedBy.id != params.removed.id) {
      return `${params.removedBy.name} ha rimosso ${params.removed.name} dalla squadra.`
    } else {
      return `${params.removed.name} ha abbandonato la squadra`
    }
  },
  teamCreated(params) {
    return `La squadra è stata creata da ${params.agent.name}`
  },
  teamRequestAccepted(params) {
    return `La squadra parteciperà al torneo ${params.tournament.name}`
  },
  participantRetired(params) {
    return `Vi siete ritirati dal torneo ${params.tournament.name}`
  },
  tournamentResult(params) {
    return `Il torneo ${params.tournament.name} è finito! Posizione in classifica: ${params.position}`
  },
}