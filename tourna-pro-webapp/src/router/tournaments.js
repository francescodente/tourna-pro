import MyTournaments from '../views/tournaments/MyTournaments.vue'
import TournamentDetails from '../views/tournaments/TournamentDetails.vue'
import SubscriptionRequests from '../views/tournaments/SubscriptionRequests.vue'
import Matches from '../views/tournaments/Matches.vue'
import MatchDetail from '../views/tournaments/MatchDetail.vue'
import Share from '../views/tournaments/Share.vue'
import CreateTournament from '../views/tournaments/CreateTournament.vue'
import ManageSubscriptions from '../views/tournaments/ManageSubscriptions.vue'
import NameAdmin from '../views/tournaments/NameAdmin.vue'
import AddParticipant from '../views/tournaments/AddParticipant.vue'

export default [
  {
    path: 'tournaments',
    name: 'MyTournaments',
    component: MyTournaments
  },
  {
    path: 'tournaments/create',
    name: 'CreateTournament',
    component: CreateTournament
  },
  {
    path: 'tournaments/requests',
    name: 'SubscriptionRequests',
    component: SubscriptionRequests
  },
  {
    path: 'tournaments/:id',
    name: 'TournamentDetails',
    component: TournamentDetails
  },
  {
    path: 'tournaments/:id/share',
    name: 'Share',
    component: Share
  },
  {
    path: 'tournaments/:id/addparticipant',
    name: 'AddParticipant',
    component: AddParticipant
  },
  {
    path: 'tournaments/:id/subscriptions',
    name: 'ManageSubscriptions',
    component: ManageSubscriptions
  },
  {
    path: 'tournaments/:id/admins',
    name: 'NameAdmin',
    component: NameAdmin
  },
  {
    path: 'tournaments/:id/matches',
    name: 'Matches',
    component: Matches
  },
  {
    path: 'tournaments/:id/matches/:match_id',
    name: 'MatchDetail',
    component: MatchDetail
  }
]