import userPermissions from '../../../../tourna-pro-backend/src/middleware/user-permissions'
import backend from '../../data-access'

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
    let user = await backend.users.getUser(userId)
    commit('setUser', user)
    let achievements = await backend.achievements.getByUser(userId) //user.id?
    commit('setAchievements', user.id, achievements)
    let interests = await backend.interests.getAll(userId) //user.id?
    commit('setInterests', user.id, interests)

  },
  async updateUser({ commit }, userId) {
    let user = await backend.users.updateUser(userId)
    commit('setUser', user)
    let interests = await backend.interests.update(userId)
    commit('setInterests', user.id, interests)
  },
  async registerUser({ commit }, user, userId) {
    let user = await backend.users.register(user)
    commit('setUser', user)
    let interests = await backend.interests.update(userId)
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