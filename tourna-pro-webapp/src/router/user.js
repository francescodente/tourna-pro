import UserProfile from '../views/profile/UserProfile.vue'
import UserModifyProfile from '../views/profile/UserModifyProfile.vue'
import UserPassword from '../views/profile/UserPassword.vue'
import UserInterest from '../views/profile/UserInterest.vue'
import UploadProfileImage from '../views/profile/UploadProfileImage.vue'

export default [
  {
    path: 'user/:id/edit',
    name: 'UserModifyProfile',
    component: UserModifyProfile
  },
  {
    path: 'user/:id/image',
    name: 'UploadProfileImage',
    component: UploadProfileImage
  },
  {
    path: 'user/:id/password',
    name: 'UserPassword',
    component: UserPassword
  },
  {
    path: 'user/:id/interests',
    name: 'UserInterest',
    component: UserInterest
  },
  {
    path: 'user/:id',
    name: 'UserProfile',
    component: UserProfile
  }
]