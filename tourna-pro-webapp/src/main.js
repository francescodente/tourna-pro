import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupFilters from './filters'
import { io } from 'socket.io-client'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import infiniteScroll from 'vue-infinite-scroll'

Vue.prototype.$socket = io(process.env.VUE_APP_NOTIFICATIONS_URL_BASE)

Vue.config.productionTip = false

setupFilters(Vue)

Vue.use(infiniteScroll)

store.dispatch('initStore');
store.dispatch('fetchActivities');
store.dispatch('fetchTournamentTypes')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
