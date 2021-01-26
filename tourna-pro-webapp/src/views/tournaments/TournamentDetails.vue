<template>
  <div v-if="loaded" class="details-container">
    <div class="container">
      <headline> {{ tournament.name }} </headline>
      <div class="text">
        {{ tournament.description }}
      </div>
    </div>
    <div class="tab-container">
      <tab-view>
        <tab title="Dettagli" :selected="true">
          <details-tab :tournament="tournament"/>
        </tab>
        <tab v-if="tournament.status == 'ACTIVE'" title="Tabellone">
          <score-board-tab :matches="matches" />
        </tab>
        <tab v-if="tournament.status == 'ACTIVE'" title="Classifica">
          <ranking-tab :ranking="ranking"/>
        </tab>
        <tab v-if="tournament.subscribed != 'NONE'" title="Attività">
          <activity-tab :logs="logs" />
        </tab>
        <tab title="Azioni">
          <action-tab 
            :owner="tournament.owned" 
            :subscribed="tournament.subscribed" 
            :active="tournament.status == 'ACTIVE'" 
            :team="tournament.mode == 'TEAMS'"
          />
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
  },
  data() {
    return {
      loaded: false,
      tournament: null,
      logs: [],
      matches: null,
      ranking: null
    }
  },
  computed: {
    tournamentId() {
      return this.$route.params.id
    }
  },
  async created() {
    this.tournament = await dataAccess.tournaments.get(this.tournamentId)
    this.logs = await dataAccess.logs.getTournamentLogs(this.tournamentId)
    this.ranking = await dataAccess.rankings.getTournamentRanking(this.tournamentId)
    this.matches = await dataAccess.matches.getAll(this.tournamentId)
    this.loaded = true
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    min-height: 30%;
  }

  .tab-container{
    height: 70%;
    color: $color-secondary2;
  }
}
</style>