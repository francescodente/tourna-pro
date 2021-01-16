<template>
  <div class="main">
    <tab-view class="tabview">
      <tab title="Iscrizioni" :selected="true">
        <subscribed-to-tab :tournaments="subscribedTournaments" :waiting="personalRequests.length > 0" />
      </tab>
      <tab title="I miei tornei">
        <managed-by-me-tab :tournaments="managedTournaments" />
      </tab>

      <tab title="Crea nuovo">
        <create-new-tournament-tab />
      </tab>
    </tab-view>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import CreateNewTournamentTab from "../../components/tournaments/my-tournaments/CreateNewTournamentTab.vue";
import ManagedByMeTab from "../../components/tournaments/my-tournaments/ManagedByMeTab.vue";
import SubscribedToTab from "../../components/tournaments/my-tournaments/SubscribedToTab.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
import style from "../../style/export.scss";
export default {
  components: {
    CreateNewTournamentTab,
    TabView,
    Tab,
    SubscribedToTab,
    ManagedByMeTab,
  },
  name: "MyTournaments",
  data: function () {
    return {
      style,
      subscribedTournaments: [],
      managedTournaments: [],
      personalRequests: []
    };
  },
  methods: {
    async fetchTournaments() {
      this.subscribedTournaments = await dataAccess.tournaments.getAll({ subscribed: true })
      this.managedTournaments = await dataAccess.tournaments.getAll({ owned: true })
    },
    async fetchPersonalSubscriptionRequests() {

    }
  },
  async created() {
    await this.fetchTournaments()
    await this.fetchPersonalSubscriptionRequests()
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