<template>
  <div class="main">
    <tab-view class="tabview" v-if="loaded">
      <tab title="Iscrizioni" :selected="true">
        <subscribed-to-tab :tournaments="subscribedTournaments" :waiting="personalRequests.length > 0" />
      </tab>
      <tab title="I miei tornei">
        <managed-by-me-tab :tournaments="managedTournaments" />
      </tab>
      <tab title="Crea nuovo">
        <create-tournament/>
      </tab>
    </tab-view>
  </div>
</template>

<script>
import dataAccess from '@/data-access'

import ManagedByMeTab from "../../components/tournaments/my-tournaments/ManagedByMeTab.vue";
import SubscribedToTab from "../../components/tournaments/my-tournaments/SubscribedToTab.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
import style from "../../style/export.scss";
import CreateTournament from './CreateTournament.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    TabView,
    Tab,
    SubscribedToTab,
    ManagedByMeTab,
    CreateTournament,
  },
  name: "MyTournaments",
  data: function () {
    return {
      style,
      subscribedTournaments: [],
      managedTournaments: [],
      personalRequests: [],
      loaded: false
    };
  },
  computed:{
    ...mapGetters(['userId'])
  },
  methods: {
    async fetchTournaments() {
      this.subscribedTournaments = await dataAccess.tournaments.getAll({ subscribed: true })
      this.managedTournaments = await dataAccess.tournaments.getAll({ owned: true })
      this.personalRequests =  await dataAccess.participationRequests.getAll({userId: this.userId, status: 'PENDING'})
      this.loaded = true
    }
  },
  async created() {
    await this.fetchTournaments()
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