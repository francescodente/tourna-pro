<template>
  <div v-if="activeTournament">
    <div class="container">
      <headline> {{ activeTournament.name }} </headline>
      <div class="text">
        {{ activeTournament.description }}
      </div>
    </div>
    <div class="tab-container">
      <tab-view>
        <tab title="Dettagli" :selected="true">
          <details-tab :tournament="activeTournament"/>
        </tab>
        <tab v-if="activeTournament.active == true" title="Tabellone">
          <score-board-tab />
        </tab>
        <tab v-if="activeTournament.subscribed == true" title="Attività">
          <activity-tab />
        </tab>
        <tab title="Azioni">
          <action-tab :owner="activeTournament.owned" :subscribed="activeTournament.subscribed" :active="activeTournament.active" />
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['tournament', 'userId']),
    activeTournament: function(){
      return this.tournament(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions(['fetchTournament'])
  },
  created: async function () {
    await this.fetchTournament(this.$route.params.id)
  }
};
</script>

<style lang="scss" scoped>
.tab-container{
  margin-top:20px;
  color: $color-secondary2;
}

</style>