import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import NotFound from '../views/NotFound.vue'

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
    meta: {
      requiresAuth: true
    },
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
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !store.getters.accessToken) {
    next({ name: 'Login' })
  } else if (!requiresAuth && store.getters.accessToken) {
    if (to.name == 'NotFound') {
      next()
    } else {
      next({ name: 'MyTournaments' })
    }
  } else {
    next()
  }
})

export default router
