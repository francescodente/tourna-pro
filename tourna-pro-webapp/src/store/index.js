import Vue from 'vue'
import Vuex from 'vuex'
import teams from './modules/teams'
import users from './modules/users'
import tournaments from './modules/tournaments'
import tournamentsTypes from './modules/tournament-types'
import logs from './modules/logs'
import activities from './modules/activities'
import achievements from './modules/achievements'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    accessToken: null,
    error: null
  },
  getters: {
    userId: state => state.userId,
    accessToken: state => state.accessToken,
    error: state => state.error
  },
  mutations: {
    initStore: async function(state) {
      if (localStorage.getItem('userId')) {
        state.userId = localStorage.getItem('userId')
      }
      if (localStorage.getItem('accessToken')) {
        state.accessToken = localStorage.getItem('accessToken')
      }
    },
    setError: (state, error) => {
      state.error = error
    }
  },
  actions: {
    dismissError({ commit }) { commit('setError', null) },
    setError({ commit }, error) {  commit('setError', error) },
    initStore({ commit }) { commit('initStore') }
  },
  modules: {
    teams,
    users,
    tournaments,
    tournamentsTypes,
    achievements,
    activities,
    logs
  }
})
