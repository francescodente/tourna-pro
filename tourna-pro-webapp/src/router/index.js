import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import MyTournaments from '../views/my-tournaments/MyTournaments.vue'
import TournamentDetails from '../views/tournaments/TournamentDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Registration
  },
  {
    path: '/mytournaments',
    name: 'MyTournaments',
    component: MyTournaments
  },
  {
    path: '/tournaments/:id',
    name: 'TournamentDetails',
    component: TournamentDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
