<template>
  <div class="main">
    <headline class="headline">Richieste di iscrizione </headline>
    <div v-if="requests.length > 0">
      <router-link
        tag="div"
        v-for="r in requests"
        :key="r.id"
        :to="requestPath(r)"
      >
        <arrow-button :text="getName(r)">
          <div :class="r.status">
            {{ r.status }}
          </div>
        </arrow-button>
      </router-link>
    </div>
    <placeholder-text v-else text="Non ci sono richieste in sospeso" />
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
import { mapGetters } from "vuex";
import PlaceholderText from '../../components/ui/PlaceholderText.vue';
export default {
  components: { ArrowButton, Headline, PlaceholderText },
  name: "SubscriptionRequests",
  data: function () {
    return {
      requests: [],
      tournamentNames: {},
    };
  },
  methods: {
    getName(r) {
      console.log(r.tournamentId);
      return this.tournamentNames[r.tournamentId];
    },
    async getTournamentName(r) {
      let t = await dataAccess.tournaments.get(r.tournamentId);
      return t.name;
    },
    requestPath(r) {
      return { name: "TournamentDetails", params: { id: r.tournamentId } };
    },
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  async created() {
    let requests = await dataAccess.participationRequests.getAll({
      userId: this.userId,
      status: "PENDING",
    });
    for (const r of requests) {
      this.tournamentNames[r.tournamentId] = await this.getTournamentName(r);
    }

    this.requests = requests;
  },
};
</script>

<style lang="scss" scoped>
.REJECTED {
  color: $color-secondary2;
  font-size: 9pt;
  font-weight: bold;
}
.PENDING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}

.headline {
  width: 90%;
  margin: 10px 5%;
}
</style>
