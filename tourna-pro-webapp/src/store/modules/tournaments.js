const state = {
  subscribedTournaments: [],
  managedTournaments: [],
  personalRequests: [],
  tournamentRequests: {},
  matches: {},
  logs: {}
}

const getters = {
  getPersonalSubscriptionRequests: state => state.personalRequests,
  getSubscribedTournaments: state => state.subscribedTournaments,
  getManagedTournaments: state => state.managedTournaments,
  getTournamentMatches: (state, id) => state.matches[id] || [],
  getTournamentLogs: (state, id) => state.logs[id] || [],
  getTournamentRequests: (state, id) => state.tournamentRequests[id] || []
}

const actions = {
  async fetchSubscribedTournaments({ commit }) {
    let subscribedTournaments = [] //TODO replace with endpoint
    commit('setSubscribedTournaments', subscribedTournaments)
  },
  async fetchPersonalSubscriptionRequest({commit}){
    let subscriptionRequests = [] //TODO replace with endpoint
    commit('setPersonalSubscriptionRequests', subscriptionRequests)
  },
  async subscribeToTournament({commit}, tournamentId){
    let request = {} //TODO replace with endpoint
    commit('addPersonalSubscriptionRequest', request)
  },
  async retireRequestToTournament({commit}, tournamentId, requestId){
    let request = {} //TODO replace with endpoint
    commit('removePersonalSubscriptionRequest', requestId)
  },
  async retireFromTournament({ commit }, tournamentId) {
    //TODO retire participant
    commit('removeSubscribedTournament', tournamentId)
  },
  async fetchManagedTournaments({ commit }) {
    let managedTournaments = [] //TODO replace with endpoint
    commit('setManagedTournaments', managedTournaments)
  },
  async createTournament({ commit }) {
    let createdTournament = {} //TODO replace with endpoint
    commit('addManagedTournament', createdTournament)
  },
  async modifyTournament({ commit }) {
    let modifiedTournament = {} //TODO replace with endpoint
    commit('removeManagedTournament', modifiedTournament)
    commit('addManagedTournament', modifiedTournament)
  },
  async cancelTournament({ commit }) {
    let deletedTournament = {} //TODO replace with endpoint
    commit('removeManagedTournament', deletedTournament)
  },
  async startTournament({ commit }) {

  },

  async fetchTournamentMatches({ commit }) {

  },
  async updateMatch({ commit }) {

  },
  async startMatch({ commit }) {

  },
  async lockMatches({ commit }) {

  },
  async fetchTournamentLogs({ commit }) {

  }
}

const mutations = {
  setSubscribedTournaments: (state, tournaments) => state.subscribedTournaments = tournaments,
  removeSubscribedTournament: (state, tournamentId) => {
    state.subscribedTournaments = state.subscribedTournaments.filter(t => t.id == tournamentId)
  },

  fetchPersonalSubscriptionRequest: (state,requests) => state.personalRequests = requests,
  addPersonalSubscriptionRequest: (state, request) => state.personalRequests.push(request),


  setManagedTournaments: (state, tournaments) => state.managedTournaments = tournaments,
  addManagedTournament: (state, tournament) => state.managedTournaments.push(tournament),
  removeManagedTournament: (state, tournament) => {
    state.managedTournaments = state.managedTournaments.filter(t => t.id == tournament.id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}