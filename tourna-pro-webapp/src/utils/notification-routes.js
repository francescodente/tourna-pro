function goToScoreBoard(tournamentId) {
  return { name: 'TournamentDetails', params: { id: tournamentId }, query: { selectedTab: 'BOARD'} }
}

function goToRanking(tournamentId) {
  return { name: 'TournamentDetails', params: { id: tournamentId }, query: { selectedTab: 'RANKING'} }
}

function goToTeam(teamId) {
  return { name: 'TeamDetails', params: { id: teamId } }
}

function goToTournament(tournamentId) {
  return { name: 'TournamentDetails', params: { id: tournamentId } }
}

function goToParticipantsList(tournamentId) {
  return { name: 'TournamentDetails', params: { id: tournamentId }, query: { selectedTab: 'PARTICIPANTS'} }
}

function goToSubscriptionRequests(tournamentId) {
  return { name: 'ManageSubscriptions', params: { id: tournamentId } }
}

const routes = {
  memberAdded(params) {
    return goToTeam(params.team.id)
  },
  memberRemoved(params) {
    return goToTeam(params.team.id)
  },
  userRequestAdded(params) {
    return goToSubscriptionRequests(params.tournament.id)
  },
  userRequestAccepted(params) {
    return goToParticipantsList(params.tournament.id)
  },
  userRequestRejected(params) {
    return goToTournament(params.tournament.id)
  },
  teamRequestAdded(params) {
    return goToSubscriptionRequests(params.tournament.id)
  },
  teamRequestAccepted(params) {
    return goToParticipantsList(params.tournament.id)
  },
  teamRequestRejected(params) {
    return goToTournament(params.tournament.id)
  },
  tournamentStarted(params) {
    return goToScoreBoard(params.tournament.id)
  },
  tournamentResult(params) {
    return goToRanking(params.tournament.id)
  },
  matchStarted(params) {
    return goToScoreBoard(params.tournament.id)
  },
  matchUpdated(params) {
    return goToScoreBoard(params.tournament.id)
  },
  roundStarted(params) {
    return goToScoreBoard(params.tournament.id)
  },
  ownerAdded(params) {
    return goToTournament(params.tournament.id)
  },
  ownerRemoved(params) {
    return goToTournament(params.tournament.id)
  },
  participantRetired(params) {
    return goToParticipantsList(params.tournament.id)
  },
  achievementUnlocked(params) {
    return { name: 'UserProfile', params: { id: params.userId } }
  }
}

export default {
  getNotificationRoute(notification) {
    let routeGetter = routes[notification.type] || (() => ({ name: 'Home' }))
    return routeGetter(notification.parameters)
  }
}