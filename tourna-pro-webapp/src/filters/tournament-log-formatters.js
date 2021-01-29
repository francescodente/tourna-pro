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
}