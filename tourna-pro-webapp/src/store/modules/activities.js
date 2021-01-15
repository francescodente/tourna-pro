import dataAccess from '../../data-access'

const state = {
  activities: []
}

const getters = {
  activities: state => state.activities,
  activity: state => id => state.activities.find(x => x.id == id) || undefined
}

const actions = {
  async fetchActivities({commit}) {
    let activities = await dataAccess.activities.getAll()
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