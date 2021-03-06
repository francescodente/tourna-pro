<template>
  <div v-if="loaded" class="details-container">
    <div class="container">
      <headline> {{ tournament.name }} </headline>
    </div>
    <div class="tab-container">
      <tab-view>
        <tab
          title="Dettagli"
          :selected="selectedTab == 'DETAILS'"
          v-if="tabVisible('DETAILS')"
        >
          <details-tab :tournament="tournament" />
        </tab>
        <tab
          title="Azioni"
          :selected="selectedTab == 'ACTIONS'"
          v-if="tabVisible('ACTIONS')"
        >
          <action-tab
            :owner="tournament.owned"
            :subscribed="tournament.subscribed"
            :active="tournament.status == 'ACTIVE'"
            :team="tournament.mode == 'TEAMS'"
          />
        </tab>
        <tab
          :title="`Gestione Round`"
          :selected="selectedTab == 'ROUNDS'"
          v-if="tabVisible('ROUNDS')"
        >
          <matches :matches="matches" :participants="participants" />
        </tab>
        <tab
          :title="`Partecipanti (${participants.requests.length})`"
          :selected="selectedTab == 'PARTICIPANTS'"
          v-if="tabVisible('PARTICIPANTS')"
        >
          <participants-tab :participants="participants" />
        </tab>
        <tab
          title="Tabellone"
          :selected="selectedTab == 'BOARD'"
          v-if="tabVisible('BOARD')"
        >
          <score-board-tab :matches="matches" :participants="participants" />
        </tab>
        <tab
          title="Classifica"
          :selected="selectedTab == 'RANKING'"
          v-if="tabVisible('RANKING')"
        >
          <ranking-tab :ranking="ranking" :participants="participants" />
        </tab>
        <tab
          title="Attività" 
          :selected="selectedTab == 'LOGS'"
          v-if="tabVisible('LOGS')"
        >
          <activity-tab :logs="logs" />
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import ActionTab from "../../components/tournaments/tournament-details/ActionTab.vue";
import ActivityTab from "../../components/tournaments/tournament-details/ActivityTab.vue";
import DetailsTab from "../../components/tournaments/tournament-details/DetailsTab.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ScoreBoardTab from "../../components/tournaments/tournament-details/ScoreBoardTab.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";
import RankingTab from "../../components/tournaments/tournament-details/RankingTab.vue";
import ParticipantsTab from "../../components/tournaments/tournament-details/ParticipantsTab.vue";
import Matches from "./Matches.vue";
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
        users: [],
      },
    };
  },
  methods: {
    tabVisible(tabID) {
      switch (tabID) {
        case "DETAILS":
          return true;
        case "ACTIONS":
          return this.tournament.status != "ENDED";
        case "ROUNDS":
          return this.tournament.status == "ACTIVE" && this.tournament.owned;
        case "PARTICIPANTS":
          return true;
        case "BOARD":
          return this.tournament.status != "PENDING";
        case "RANKING":
          return this.tournament.status != 'PENDING';
        case "LOGS":
          return true;
      }
    },
    async fetchAll() {
      this.loaded = false
      this.tournament = await dataAccess.tournaments.get(this.tournamentId);
      this.logs = await dataAccess.logs.getTournamentLogs(this.tournamentId);
      this.ranking = await dataAccess.rankings.getTournamentRanking(
        this.tournamentId
      );
      this.matches = await dataAccess.matches.getAll(this.tournamentId);
      this.participants.requests = await dataAccess.participationRequests.getAll({
        tournamentId: this.tournamentId,
        status: "APPROVED",
      });
      let users = this.participants.requests
        .map((r) => r.userId)
        .filter((id) => id);
      if (users.length > 0) {
        this.participants.users = await dataAccess.users.search({
          userIds: JSON.stringify(users),
        });
      }
      let teams = this.participants.requests
        .map((p) => p.teamId)
        .filter((id) => id);
      if (teams.length > 0) {
        this.participants.teams = await dataAccess.teams.getAll({
          teamIds: JSON.stringify(teams),
        });
      }
      this.loaded = true;
    }
  },
  computed: {
    tournamentId() {
      return this.$route.params.id;
    },
    selectedTab() {
      if (this.tournament && !this.$route.query.selectedTab) {
        return this.tournament.owned && this.tabVisible('ACTIONS') ? "ACTIONS" : "DETAILS";
      } else if(this.tabVisible(this.$route.query.selectedTab)){
        return this.$route.query.selectedTab
      } else {
        return 'DETAILS'
      }
    }
  },
  async created() {
    await this.fetchAll()
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  }
};
</script>

<style lang="scss" scoped>
.details-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tab-container {
    flex-grow: 1;
    color: $color-secondary2;
  }
}
</style>