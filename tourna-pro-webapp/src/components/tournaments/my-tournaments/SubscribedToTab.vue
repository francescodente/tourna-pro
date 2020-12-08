<template>
  <div class="bg">
    <div v-if="waiting" class="waiting">
      Mostra tornei in sospeso
      <i class="fas fa-angle-right"></i>
    </div>
    <tournament-card
      v-for="tournament in tournaments"
      :key="tournament.id"
      :status="tournament.status"
      :tournament="tournament"
    />
  </div>
</template>

<script>
import TournamentCard from "../TournamentCard.vue";
export default {
  components: { TournamentCard },
  name: "SubscribedToTab",
  props: {
    tournaments: Array,
    waiting: Array,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 0% 3%;
}

.waiting {
  text-decoration: underline;
  color: $color-primary;
  padding: 7px;
  margin: 10px 0px;
}
</style>