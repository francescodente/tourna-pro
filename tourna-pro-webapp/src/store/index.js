import Vue from 'vue'
import Vuex from 'vuex'
import teams from './modules/teams'
import users from './modules/users'
import tournaments from './modules/tournaments'
import tournamentsTypes from './modules/tournaments-types'
import logs from './modules/logs'
import activities from './modules/activities'
import achievements from './modules/achievements'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
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
