import dataAccess from '../../data-access'

const state = {
  achievements: []
}

const getters = {
  achievements: state => state.achievements,
  achievement: state => id => state.achievements.find(x => x.id == id)
}

const actions = {
  async fetchAchievements({commit}) {
    let achievements = await dataAccess.achievements.getAll()
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