const state = {
  teams: [],
  members: {},
  logs: {}
}

const getters = {
  getTeams: state => state.teams,
  getTeamMembers: (state, id) => state.members[id] || [],
  getTeamLogs: (state, id) => state.logs[id] || []
}

const actions = {
  async fetchTeams({ commit }) {
    let teams = [] //TODO replace with endpoint
    commit('setTeams', teams)
  },
  async fetchTeamMembers({ commit }, teamId) {
    let teamMembers = [] //TODO replace with endpoint
    commit('setMembers', teamId, teamMembers)
  },
  async createTeam({ commit }) {
    let team = {} //TODO replace with endpoint
    commit('addTeam', team)
  },
  async deleteTeam({ commit }) {
    let team = {} //TODO replace with endpoint
    commit('removeTeam', team)
  },
  async modifyTeam({ commit }) {
    let team = {} //TODO replace with endpoint
    commit('removeTeam', team)
    commit('addTeam', team)
  },
  async addMember({ commit }) {
    let teamMembers = [] //TODO replace with endpoint
    commit('setMembers', teamId, teamMembers)
  },
  async removeMember({ commit }) {
    let teamMembers = [] //TODO replace with endpoint
    commit('setMembers', teamId, teamMembers)
  },
  async fetchTeamLogs({ commit }) {
    let teamLogs = [] //TODO replace with endpoint
    commit('setLogs', teamId, teamLogs)
  }
}

const mutations = {
  setTeams: (state, teams) => state.teams = teams,
  setMembers: (state, teamId, teamMembers) => state.members[teamId] = teamMembers,
  addTeam: (state, team) => state.teams.push(team),
  removeTeam: (state, team) => state.teams = state.teams.filter(t => t.id == team.id),
  setLogs: (state, teamId, teamLogs) => state.logs[teamId] = teamLogs

}

export default {
  state,
  getters,
  actions,
  mutations
}