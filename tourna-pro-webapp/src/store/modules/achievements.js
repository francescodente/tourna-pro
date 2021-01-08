import backend from '../../data-access'

const state = {
  achievements: []
}

const getters = {
  getAchievements: state => state.achievements
}

const actions = {
  async fetchAchievements({commit}) {
    let achievements = await backend.achievements.getAll()
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