import UserInfo from '../components/registration/UserInfo.vue'
import AuthInfo from '../components/registration/AuthInfo.vue'
import ActivityInfo from '../components/registration/ActivityInfo.vue'

export default [
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