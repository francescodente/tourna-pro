const state = {
  subscribedTournaments: [],
  managedTournaments: [],
  matches: {},
  logs: {}
}

const getters = {
  getSubscribedTournaments: state => state.subscribedTournaments,
  getManagedTournaments: state => state.managedTournaments,
  getTournamentMatches: (state, id) => state.matches[id] || [],
  getTournamentLogs: (state, id) => state.logs[id] || []
}

const actions = {
  async fetchSubscribedTournaments() {

  },
  async fetchManagedTournaments() {

  },
  async createTournament() {

  },
  async modifyTournament() {

  },
  async startTournament() {

  },
  async cancelTournament() {

  },
  async fetchTournamentMatches() {

  },
  async updateMatch() {

  },
  async startMatch() {

  },
  async lockMatches() {

  },
  async fetchTournamentLogs() {

  }
}

const mutations = {
  setSubscribedTournaments: (state, tournaments) => state.subscribedTournaments = tournaments,
  setManagedTournaments: (state, tournaments) => state.managedTournaments = tournaments
}

export default {
  state,
  getters,
  actions,
  mutations
}