import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

import registrationRoutes from './registration'

import notificationRoutes from './notifications'
import tournamentRoutes from './tournaments'
import teamRoutes from './teams'
import exploreRoutes from './explore'
import userRoutes from './user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    component: Registration,
    children: registrationRoutes
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/tournaments'
      },
      ...notificationRoutes,
      ...tournamentRoutes,
      ...exploreRoutes,
      ...userRoutes,
      ...teamRoutes
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.accessToken) {
    console.log(store.getters.accessToken)
    next({ name: 'Login' })
  }
  else next()
})

export default router
