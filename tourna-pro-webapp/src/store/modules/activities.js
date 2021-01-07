const state = {
  activities: []
}

const getters = {
  getActivities: state => state.activities
}

const actions = {
  async fetchActivities({commit}) {
    let activities = [] //TODO replace with endpoint
    commit('setActivities', activities)
  }
}

const mutations = {
  setActivities: (state, activities) => state.activities = activities
}

export default {
  state,
  getters,
  actions,
  mutations
}