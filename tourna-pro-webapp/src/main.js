import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupFilters from './filters'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

setupFilters(Vue)

new Vue({
  router,
  store,
  beforeCreate() { this.$store.dispatch('initStore') },
  render: h => h(App)
}).$mount('#app')

