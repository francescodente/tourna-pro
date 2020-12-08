<template>
  <div class="main">
    <tab-view class="tabview">
      <tab title="Iscrizioni" :selected="true">
        <subscribed-to-tab :tournaments="tournaments" :waiting="waiting"/>
      </tab>
      <tab title="I miei tornei"> 
        <managed-by-me-tab :tournaments="tournaments"/>
      </tab>
    
      <tab title="Crea nuovo">
        <create-new-tournament-tab />
      </tab>
    </tab-view>
  </div>
</template>

<script>
import CreateNewTournamentTab from "../../components/tournaments/my-tournaments/CreateNewTournamentTab.vue";
import ManagedByMeTab from '../../components/tournaments/my-tournaments/ManagedByMeTab.vue';
import SubscribedToTab from '../../components/tournaments/my-tournaments/SubscribedToTab.vue';
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
import style from "../../style/export.scss";
export default {
  components: { CreateNewTournamentTab, TabView, Tab, SubscribedToTab, ManagedByMeTab },
  name: "MyTournaments",
  data: function () {
    return {
      style,
      waiting: true,
      tournaments: [
        {
          id: 1,
          name: "Torneo di prova con nome lungo",
          ageGroup: "Under 24",
          gender: "Maschile",
          place: "Palazzetto dello Sport",
          date: "10/12/2020",
          partecipants: 2,
          total: 5,
          type: "team",
          activity: "calcetto",
          status: "ACTIVE"
        },
        {
          id: 2,
          name: "Torneo di prova 2",
          ageGroup: "Under 24",
          gender: "Maschile",
          place: "Palazzetto dello Sport",
          date: "10/12/2020",
          partecipants: 2,
          total: 5,
          type: "single",
          activity: "basket",
          status: "FUTURE"
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
}

.tabview {
  color: $color-primary;
}
</style>