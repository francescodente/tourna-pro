export default {
  memberAdded(params) {
    return `${params.addedBy.name} ti ha aggiungto alla squadra "${params.team.name}"`
  },
  memberRemoved(params) {
    return `${params.removedBy.name} ti ha rimosso dalla squadra "${params.team.name}"`
  },
  userRequestAdded(params) {
    return `L'utente ${params.user.name} ha richiesto di iscriversi al torneo "${params.tournament.name}"`
  },
  userRequestAccepted(params) {
    return `La tua richiesta al torneo "${params.tournament.name}" è stata accettata`
  },
  userRequestRejected(params) {
    return `La tua richiesta al torneo "${params.tournament.name}" è stata rifiutata`
  },
  teamRequestAdded(params) {
    return `La squadra "${params.team.name}" ha richiesto di partecipare al torneo "${params.tournament.name}"`
  },
  teamRequestAccepted(params) {
    return `La tua richiesta al torneo "${params.tournament.name}" è stata accettata`
  },
  teamRequestRejected(params) {
    return `La tua richiesta al torneo "${params.tournament.name}" è stata rifiutata`
  },
  tournamentStarted(params) {
    return `Il torneo "${params.tournament.name}" è iniziato!`
  },
  tournamentResult(params) {
    return `Il torneo "${params.tournament.name}" è finito! Posizione in classifica: ${params.position}`
  },
  matchStarted(params) {
    return `Il match tra "${params.participant1.name}" e "${params.participant2.name}" è iniziato!`
  },
  matchUpdated(params) {
    return `Il risultato del match tra "${params.participant1.name}" e "${params.participant2.name}" è stato aggiornato: ${params.participant1.score} - ${params.participant2.score}`
  },
  roundStarted(params) {
    return `È iniziato il ${params.roundIndex + 1}° round nel torneo "${params.tournament.name}"`
  },
  ownerAdded(params) {
    return `${params.agent.name} ti ha aggiungto agli organizzatori del torneo "${params.tournament.name}"`
  },
  ownerRemoved(params) {
    return `${params.agent.name} ti ha rimosso dagli organizzatori del torneo "${params.tournament.name}"`
  },
  participantRetired(params) {
    return `Il partecipante "${params.participant.name}" si è ritirato dal torneo "${params.tournament.name}"`
  },
  achievementUnlocked(params) {
    return `Hai sbloccato l'achievement "${params.achievement.name}"!`
  }

}

