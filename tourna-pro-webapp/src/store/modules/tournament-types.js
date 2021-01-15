import dataAccess from '../../data-access'

const state = {
  tournamentTypes: []
}

const getters = {
  tournamentTypes: state => state.tournamentTypes,
  tournamentType: state => type => state.tournamentTypes.find(x => x.id == type)
}

const actions = {
  async fetchTournamentTypes({commit}) {
    let types = await dataAccess.tournamentTypes.getAll()
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