import dataAccess from '../../data-access'

const state = {
  users: {},
  interests: {},
  achievements: {}
}

const getters = {
  user: state => id => state.users[id] || null,
  userInterests: state => id => state.interests[id] || [],
  userAchievements: state => id => state.achievements[id] || []
}

const actions = {
  async fetchUser({ commit }, userId) {
    let user = await dataAccess.users.getUser(userId)
    commit('setUser', user.data)
    let achievements = await dataAccess.achievements.getByUser(userId)
    commit('setAchievements', user.data.id, achievements.data)
    let interests = await dataAccess.interests.getAll(userId)
    commit('setInterests', user.data.id, interests.data) 
  },
  async updateUser({ commit }, userBody, allInterests) {
    let user = await dataAccess.users.updateUser(userBody.id, allInterests)
    commit('setUser', user.data)
    let interests = await dataAccess.interests.update(userBody.id, allInterests)
    commit('setInterests', user.data.id, interests.data)
  },
  async registerUser({ commit }, userBody, allInterests) {
    let user = await dataAccess.users.register(userBody)
    commit('setUser', user.data)
    let interests = await dataAccess.interests.update(user.id, allInterests)
    commit('setInterests', user.data.id, interests.data)
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