<template>
  <div class="main">
    <headline class="headline">Richieste di iscrizione </headline>
    <router-link
      tag="div"
      v-for="r in requests"
      :key="r.id"
      :to="requestPath(r)"
    >
      <arrow-button :text="r.tournament_name">
        <div :class="r.status">
          {{ r.status }}
        </div>
      </arrow-button>
    </router-link>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
import { mapGetters } from 'vuex';
export default {
  components: { ArrowButton, Headline },
  name: "SubscriptionRequests",
  data: function() {
    return {
      requests: []
    }
  },
  methods: {
    requestPath(r){
      return {name: 'TournamentDetails', params: {id: r.tournamentId}}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.requests = await dataAccess.requests.getAll({userId: this.userId, status: 'PENDING'})
  }
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
