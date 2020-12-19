import TeamsHome from '../views/teams/TeamsHome.vue'
import TeamDetails from '../views/teams/TeamDetails.vue'
import TeamEdit from '../views/teams/TeamEdit.vue'

export default [
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
    path: 'teams/:id/edit',
    name: 'TeamEdit',
    component: TeamEdit
  }
]