<template>
  <div v-if="loaded" class="details-container">
    <div class="container">
      <headline> {{ tournament.name }} </headline>
    </div>
    <div class="tab-container">
      <tab-view>
        <tab title="Dettagli" :selected="selectedTab == 'DETAILS'">
          <details-tab :tournament="tournament"/>
        </tab>
        <tab title="Azioni"  :selected="selectedTab == 'ACTIONS'" v-if="tournament.status != 'ENDED'">
          <action-tab 
            :owner="tournament.owned" 
            :subscribed="tournament.subscribed" 
            :active="tournament.status == 'ACTIVE'" 
            :team="tournament.mode == 'TEAMS'"
          />
        </tab>
        <tab v-if="tournament.status == 'ACTIVE' && tournament.owned" :title="`Gestione Round`" :selected="selectedTab == 'ROUNDS'">
          <matches :matches="matches" :participants="participants"/>
        </tab>
        <tab :title="`Partecipanti (${participants.requests.length})`" :selected="selectedTab == 'PARTICIPANTS'">
          <participants-tab :participants="participants" />
        </tab>
        <tab v-if="tournament.status != 'PENDING'" title="Tabellone"  :selected="selectedTab == 'BOARD'">
          <score-board-tab :matches="matches" :participants="participants" />
        </tab>
        <tab v-if="tournament.status != 'PENDING'" title="Classifica" :selected="selectedTab == 'RANKING'">
          <ranking-tab :ranking="ranking" :participants="participants" />
        </tab>
        <tab title="Attività" :selected="selectedTab == 'LOGS'">
          <activity-tab :logs="logs" />
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import ActionTab from "../../components/tournaments/tournament-details/ActionTab.vue";
import ActivityTab from "../../components/tournaments/tournament-details/ActivityTab.vue";
import DetailsTab from "../../components/tournaments/tournament-details/DetailsTab.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ScoreBoardTab from "../../components/tournaments/tournament-details/ScoreBoardTab.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
import RankingTab from '../../components/tournaments/tournament-details/RankingTab.vue';
import ParticipantsTab from '../../components/tournaments/tournament-details/ParticipantsTab.vue';
import Matches from './Matches.vue';
export default {
  name: "TournamentDetails",
  components: {
    Headline,
    TabView,
    Tab,
    DetailsTab,
    ActionTab,
    ScoreBoardTab,
    ActivityTab,
    RankingTab,
    ParticipantsTab,
    Matches,
  },
  data() {
    return {
      loaded: false,
      tournament: null,
      logs: [],
      matches: null,
      ranking: null,
      participants: {
        requests: [],
        teams: [],
        users: []
      }
    }
  },
  computed: {
    tournamentId() {
      return this.$route.params.id
    },
    selectedTab() {
      if(this.tournament && !this.$route.query.selectedTab){
        return this.tournament.owned ? 'ACTIONS' : 'DETAILS'
      }
      return this.$route.query.selectedTab 
    }
  },
  async created() {
    this.tournament = await dataAccess.tournaments.get(this.tournamentId)
    this.logs = await dataAccess.logs.getTournamentLogs(this.tournamentId)
    this.ranking = await dataAccess.rankings.getTournamentRanking(this.tournamentId)
    this.matches = await dataAccess.matches.getAll(this.tournamentId)
    this.participants.requests = await dataAccess.participationRequests.getAll({
      tournamentId: this.tournamentId,
      status: 'APPROVED'
    })
    let users = this.participants.requests.map(r => r.userId).filter(id => id)
    if (users.length > 0) {
      this.participants.users = await dataAccess.users.search({ userIds: JSON.stringify(users) })
    }
    let teams = this.participants.requests.map(p => p.teamId).filter(id => id)
    if (teams.length > 0) {
      this.participants.teams = await dataAccess.teams.getAll({ teamIds: JSON.stringify(teams) })
    }
    this.loaded = true
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tab-container{
    flex-grow: 1;
    color: $color-secondary2;
  }
}
</style>