import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Notifications from '../views/Notifications.vue'
import Registration from '../views/Registration.vue'
import TeamsHome from '../views/teams/TeamsHome.vue'
import MyTournaments from '../views/tournaments/MyTournaments.vue'
import TournamentDetails from '../views/tournaments/TournamentDetails.vue'
import TeamDetails from '../views/teams/TeamDetails.vue'
import UserInfo from '../components/registration/UserInfo.vue'
import AuthInfo from '../components/registration/AuthInfo.vue'
import ActivityInfo from '../components/registration/ActivityInfo.vue'

import UserProfile from '../views/profile/UserProfile.vue'
import UserModifyProfile from '../views/profile/UserModifyProfile.vue'
import UserPassword from '../views/profile/UserPassword.vue'
import UserInterest from '../views/profile/UserInterest.vue'

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
    children: [
      {
        path: '',
        name: 'Register',
        redirect: 'authinfo'
      },
      {
        path: 'authinfo',
        component: AuthInfo,
        name: 'AuthInfo'
      },
      {
        path: 'userinfo',
        component: UserInfo,
        name: 'UserInfo'
      },
      {
        path: 'activityinfo',
        component: ActivityInfo,
        name: 'ActivityInfo'
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'mytournaments',
        name: 'MyTournaments',
        component: MyTournaments
      },
      {
        path: 'tournaments/:id',
        name: 'TournamentDetails',
        component: TournamentDetails
      },
      {
        path: 'teams',
        name: 'Teams',
        component: TeamsHome
      },
      {
        path: 'teams/:id',
        name: 'TeamDetails',
        component: TeamDetails
      },
      {
        path: 'user/:id',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: 'user/:id/modify',
        name: 'UserModifyProfile',
        component: UserModifyProfile
      },
      {
        path: 'user/:id/password',
        name: 'UserPassword',
        component: UserPassword
      },
      {
        path: 'user/:id/interest',
        name: 'UserInterest',
        component: UserInterest
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
