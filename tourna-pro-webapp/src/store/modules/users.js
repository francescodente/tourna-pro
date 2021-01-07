const state = {
  users: {},
  interests: {},
  achievements: {}
}

const getters = {
  getUser: (state, id) => state.users[id] || null,
  getUserInterests: (state, id) => state.interests[id] || [],
  getUserAchievements: (state, id) => state.achievements[id] || []
}

const actions = {
  async fetchUser({ commit }) {
    let user = {} //TODO replace with endpoint
    commit('setUser', user)
    let achievements = {} //TODO replace with endpoint
    commit('setAchievements', user.id, achievements)
    let interests = {} //TODO replace with endpoint
    commit('setInterests', user.id, interests)

  },
  async updateUser({ commit }) {
    let user = {} //TODO replace with endpoint
    commit('setUser', user)
    let achievements = {} //TODO replace with endpoint
    commit('setAchievements', user.id, achievements)
    let interests = {} //TODO replace with endpoint
    commit('setInterests', user.id, interests)
  },
  async registerUser({ commit }) {
    let user = {} //TODO replace with endpoint
    commit('setUser', user)
    let achievements = {} //TODO replace with endpoint
    commit('setAchievements', user.id, achievements)
    let interests = {} //TODO replace with endpoint
    commit('setInterests', user.id, interests)
  }
}

const mutations = {
  setUser: (state, user) => state.users[user.id] = user,
  setAchievements: (state, userId, achievements) => state.achievements[userId] = achievements,
  setInterests: (state, userId, interests) => state.interests[userId] = interests,
}

export default {
  state,
  getters,
  actions,
  mutations
}