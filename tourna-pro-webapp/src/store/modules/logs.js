const state = {
  userLogs: []
}

const getters = {
  getUserLogs: state => state.userLogs
}

const actions = {
  async fetchUserLogs({ commit }) {
    let userLogs = [] //TODO replace with endpoint
    commit('setUserLogs', userLogs)
  },
  async markLogAsRead({ commit }, readId) {
    let readLog = {} //TODO replsace with endpoint
    commit('setReadLog', readLog)
  }
}

const mutations = {
  setUserLogs: (state, userLogs) => state.userLogs = userLogs,
  setReadLog: (state, readLog) => {
    state.userLogs = state.userLogs.filter(x => x.id != readLog.id)
    state.userLog.push(readLog)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}