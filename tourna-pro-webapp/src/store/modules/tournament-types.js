const state = {
  tournamentTypes: []
}

const getters = {
  getTournamentTypes: state => state.tournamentTypes
}

const actions = {
  async fetchTournamentTypes({commit}) {
    let types = [] //TODO replace with endpoint
    commit('setTournamentTypes', types)
  }
}

const mutations = {
  setTournamentTypes: (state, types) => state.tournamentTypes = types
}

export default {
  state,
  getters,
  actions,
  mutations
}