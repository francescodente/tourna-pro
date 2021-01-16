import TeamsHome from '../views/teams/TeamsHome.vue'
import TeamDetails from '../views/teams/TeamDetails.vue'
import TeamEdit from '../views/teams/TeamEdit.vue'
import TeamCreate from '../views/teams/TeamCreate.vue'

export default [
  {
    path: 'create-team',
    name: 'TeamCreate',
    component: TeamCreate
  },
  {
    path: 'teams/:id/edit',
    name: 'TeamEdit',
    component: TeamEdit
  },
  {
    path: 'teams/:id',
    name: 'TeamDetails',
    component: TeamDetails
  },
  {
    path: 'teams',
    name: 'Teams',
    component: TeamsHome
  }
]