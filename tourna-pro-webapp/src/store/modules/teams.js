function requestTeams() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Inazuma Eleven',
      image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
      members: 11
    },
    {
      id: 2,
      name: 'Rin Tin Team',
      image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
      members: 12
    }
  ])
}

const state = {
  teams: []
}

const getters = {
  myTeams: state => state.teams
}

const actions = {
  async fetchTeams({commit}) {
    let teams = await requestTeams();

    commit('setTeams', teams)
  }
}

const mutations = {
  setTeams: (state, teams) => state.teams = teams
}

export default {
  state,
  getters,
  actions,
  mutations
}