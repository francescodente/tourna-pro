import dataAccess from '../../data-access'

const state = {
  unreadNotifications: 0
}

const getters = {
  unreadNotifications: state => state.unreadNotifications
}

const actions = {
  async initUnreadNotifications({ commit }, userId) {
    let res = await dataAccess.logs.getUnreadNotifications(userId)
    commit('updateUnreadNotifications', () => res.count)
  },
  newNotification({ commit }) {
    commit('updateUnreadNotifications', c => c + 1)
  },
  readNotification({ commit }, ) {
    commit('updateUnreadNotifications', c => c - 1)
  }
}

const mutations = {
  updateUnreadNotifications(state, update) {
    state.unreadNotifications = update(state.unreadNotifications)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}