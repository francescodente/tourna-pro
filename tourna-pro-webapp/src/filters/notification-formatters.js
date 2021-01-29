export default {
  memberAdded(params) {
    return `${params.addedBy.name} ti ha aggiungto alla squadra ${params.team.name}`
  },
  memberRemoved(params) {
    return `${params.removedBy.name} ti ha rimosso dalla squadra ${params.team.name}`
  },
  userRequestAdded(params) {
    return `Hai richiesto di partecipare al torneo ${params.tournament.name}`
  },
  userRequestAccepted(params) {
    return `La tua richiesta al torneo ${params.tournament.name} è stata accettata`
  },
  userRequestRejected(params) {
    return `La tua richiesta al torneo ${params.tournament.name} è stata rifiutata`
  },
  teamRequestAdded(params) {
    return `La tua squadra ${params.team.name} ha richiesto di partecipare al torneo ${params.tournament.name}`
  },
  teamRequestAccepted(params) {
    return `La tua richiesta al torneo ${params.tournament.name} è stata accettata`
  },
  teamRequestRejected(params) {
    return ``
  },
  tournamentStarted(params) {
    return ``
  },
  tournamentEnded(params) {
    return ``
  },
  matchStarted(params) {
    return ``
  },
  matchUpdated(params) {
    return ``
  },
  roundStarted(params) {
    return ``
  },
  roundEnded(params) {
    return ``
  },
  ownerAdded(params) {
    return ``
  },
  ownerRemoved(params) {
    return ``
  },
  participantRetired(params) {
    return ``
  },
  achievementUnlocked(params){
    return ``
  }



}

