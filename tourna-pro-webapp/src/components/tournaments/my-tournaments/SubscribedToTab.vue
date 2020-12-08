<template>
  <div class="bg">
    <div v-if="waiting" class="waiting">
      <router-link to="/suspended" tag="div">
      Mostra tornei in sospeso
      <i class="fas fa-angle-right"></i>
      </router-link>
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
    waiting: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 0% 3%;
  padding-top: 7px;
}

.waiting {
  text-decoration: underline;
  color: $color-primary;
  margin: 10px 0px;
  padding-bottom: 5%;
}
</style>