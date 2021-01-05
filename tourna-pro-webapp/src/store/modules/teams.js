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
  async fetchTeams({commit}) {

  },
  async fetchTeamMembers() {

  },
  async createTeam() {

  },
  async deleteTeam() {

  },
  async modifyTeam() {

  },
  async addMember() {

  },
  async removeMember() {

  },
  async fetchTeamLogs() {

  }
}

const mutations = {
  setTeams: (state, teams) => state.teams = teams
}

export default {
  state,
  getters,
  actions,
  mutations
}