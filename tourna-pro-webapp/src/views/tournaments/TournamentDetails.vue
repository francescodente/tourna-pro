<template>
  <div v-if="tournament" class="details-container">
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
        <tab v-if="tournament.active == true" title="Tabellone">
          <score-board-tab />
        </tab>
        <tab v-if="tournament.subscribed == true" title="Attività">
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
  },
  data() {
    return {
      tournament: null,
      logs: []
    }
  },
  methods: {
    async fetchTournament() {
      this.tournament = await dataAccess.tournaments.get(this.$route.params.id)
      this.logs = [] // TODO: replace with backend call
    }
  },
  created: async function () {
    await this.fetchTournament()
  }
};
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
    max-height: 70%;
    color: $color-secondary2;
  }
}
</style>