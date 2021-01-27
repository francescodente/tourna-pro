import Vue from 'vue'
import Vuex from 'vuex'
import tournamentsTypes from './modules/tournament-types'
import activities from './modules/activities'
import achievements from './modules/achievements'
import notifications from './modules/notifications'

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
    error: state => state.error,
    isLoggedIn: state => state.userId != null
  },
  mutations: {
    initStore: async function (state) {
      if (localStorage.getItem('userId')) {
        state.userId = localStorage.getItem('userId')
      }
      if (localStorage.getItem('accessToken')) {
        state.accessToken = localStorage.getItem('accessToken')
      }
    },
    resetStore: async function (state) {
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
      state.userId = null
      state.accessToken = null
    },
    setError: (state, error) => {
      state.error = error
    }
  },
  actions: {
    dismissError({ commit }) { commit('setError', null) },
    setError({ commit }, error) { commit('setError', error) },
    initStore({ commit }) { commit('initStore') },
    logout({ commit }) { commit('resetStore') }
  },
  modules: {
    tournamentsTypes,
    achievements,
    activities,
    notifications
  }
})
