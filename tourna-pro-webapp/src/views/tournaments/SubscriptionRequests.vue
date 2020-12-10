<template>
  <div class="main">
     <headline class="headline">Richieste di iscrizione </headline>
    <arrow-button v-for="r in requests" :key="r.id" :text="r.tournament_name">
      <div :class="r.status">
        {{ r.status }}
      </div>
    </arrow-button>
  </div>
</template>

<script>
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
export default {
  components: { ArrowButton, Headline},
  name: "SubscriptionRequests",
  data: function () {
    return {
      requests: [
        {
          id: 1,
          tournament_id: 1,
          tournament_name: "Torneo in sospeso",
          status: "WAITING",
        },
        {
          id: 2,
          tournament_id: 2,
          tournament_name: "Torneo rifiutato",
          status: "REJECTED",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.REJECTED {
  color: $color-secondary2;
  font-size: 9pt;
  font-weight: bold;
}
.WAITING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}

.headline{
  width:90%;
  margin: 10px 5%;
}
</style>
