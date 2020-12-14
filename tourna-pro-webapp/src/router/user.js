import UserProfile from '../views/profile/UserProfile.vue'
import UserModifyProfile from '../views/profile/UserModifyProfile.vue'
import UserPassword from '../views/profile/UserPassword.vue'
import UserInterest from '../views/profile/UserInterest.vue'

export default [
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