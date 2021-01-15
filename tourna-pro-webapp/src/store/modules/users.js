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
    let achievements = await dataAccess.achievements.getByUser(userId)
    let interests = await dataAccess.interests.getAll(userId)
    commit('setUser', user, achievements, interests)

  },
  async updateUser({ state, commit }, userBody, allInterests) {
    let user = await dataAccess.users.updateUser(userBody.id, allInterests)
    let interests = await dataAccess.interests.update(userBody.id, allInterests)
    commit('setUser', user, state.achievements, interests)
  },
  async registerUser({state, commit }, userBody, allInterests) {
    let user = await dataAccess.users.register(userBody)
    let interests = await dataAccess.interests.update(user.id, allInterests)
    commit('setUser', user, state.achievements, interests)
  }
}

const mutations = {
  setUser: (state, user, achievements, interests) => {
    state.users[user.id] = user
    state.achievements[user.id] = achievements
    state.interests[user.id] = interests
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}