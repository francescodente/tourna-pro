export default {
  ownerAdded(params) {
    return `${params.user.name} è stato aggiungto agli organizzatori`
  },
  ownerRemoved(params) {
    return `${params.user.name} è stato rimosso dagli organizzatori`
  },
  roundStarted(params) {
    return `È iniziato il ${params.roundIndex + 1}° round`
  },
  tournamentStarted(params) {
    return `Il torneo è iniziato!`
  },
  tournamentEnded(params) {
    return `Il torneo è finito.`
  },
  tournamentCreated(params) {
    return `Il torneo è stato creato da ${params.agent.name}`
  },
  userRequestAccepted(params) {
    return `L'utente ${params.user.name} è stato aggiunto ai partecipanti`
  },
  teamRequestAccepted(params) {
    return `La squadra ${params.team.name} è stata aggiunta ai partecipanti`
  },
  participantRequestAccepted(params) {
    return `${params.participant.name} è stato aggiunto ai partecipanti`
  }
}