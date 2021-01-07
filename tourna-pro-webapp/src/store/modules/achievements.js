const state = {
  achievements: []
}

const getters = {
  getAchievements: state => state.achievements
}

const actions = {
  async fetchAchievements({commit}) {
    let achievements = [] //TODO replace with endpoint call
    commit('setAchievements', achievements)
  }
}

const mutations = {
  setAchievements: (state, achievements) => state.achievements = achievements
}

export default {
  state,
  getters,
  actions,
  mutations
}