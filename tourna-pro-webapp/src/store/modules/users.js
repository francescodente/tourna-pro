import dataAccess from '../../data-access'

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
  async fetchUser({ commit }, userId) {
    let user = await dataAccess.users.getUser(userId)
    commit('setUser', user)
    let achievements = await dataAccess.achievements.getByUser(userId)
    commit('setAchievements', user.id, achievements)
    let interests = await dataAccess.interests.getAll(userId)
    commit('setInterests', user.id, interests)

  },
  async updateUser({ commit }, userBody, allInterests) {
    let user = await dataAccess.users.updateUser(userBody.id, allInterests)
    commit('setUser', user)
    let interests = await dataAccess.interests.update(userBody.id, allInterests)
    commit('setInterests', user.id, interests)
  },
  async registerUser({ commit }, userBody, allInterests) {
    let user = await dataAccess.users.register(userBody)
    commit('setUser', user)
    let interests = await dataAccess.interests.update(user.id, allInterests)
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