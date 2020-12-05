<template>
  <div>
    <div class="container">
      <headline> {{ tournament.name }} </headline>
      <div class="text">
        {{ tournament.description }}
      </div>
    </div>
    <div class="tab-container">
      <tab-view>
        <tab title="Dettagli" :selected="true">
          <details-tab :details="details"/>
        </tab>
        <tab v-if="tournament.active == true" title="Tabellone">
          <score-board-tab />
        </tab>
        <tab v-if="subscribed == true" title="Attività">
          <activity-tab />
        </tab>
        <tab title="Azioni">
          <action-tab />
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import ActionTab from "../../components/tournaments/tournament-details/ActionTab.vue";
import ActivityTab from "../../components/tournaments/tournament-details/ActivityTab.vue";
import DetailsTab from "../../components/tournaments/tournament-details/DetailsTab.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ScoreBoardTab from "../../components/tournaments/tournament-details/ScoreBoardTab.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
export default {
  name: "TournamentDetails",
  data: function () {
    return {
      tournament: {
        id: 1,
        name: "Torneo di prova con nome lungo",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum purus at aliquet pharetra. Integer feugiat in mi sed tempor. Integer varius sollicitudin augue et auctor. Nunc finibus mollis nisi, posuere gravida enim euismod id. Sed lobortis, mi vel pulvinar varius, quam neque feugiat risus, vitae lobortis magna tortor eu sapien. ",
        ageGroup: "Under 24",
        gender: "Maschile",
        place: "Palazzetto dello Sport",
        date: "10/12/2020",
        partecipants: 2,
        total: 5,
        type: "team",
        activity: "calcetto",
        active: true
      },
      owner: true,
      subscribed: true
    };
  },
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
    details() {
      var {ageGroup, gender, place, date, partecipants, total, type, activity} = this.tournament
      var obj = {ageGroup, gender, place, date, partecipants, total, type, activity}
      return obj
    },
    actions(){
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-container{
  color: $color-secondary2;
}

</style>