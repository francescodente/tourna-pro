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
  async fetchUser() {
    
  },
  async updateUser() {

  },
  async registerUser() {

  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}