<template>
  <div class="bg">
    <div v-if="waiting" class="waiting">
      <router-link :to="this.$route.path + '/requests'" tag="div">
        Mostra richieste in sospeso
        <i class="fas fa-angle-right"></i>
      </router-link>
    </div>
    <tournament-card
      class="tournament-card"
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
  padding: 30px 20px;
}

.waiting {
  text-decoration: underline;
  color: $color-primary;
}

.tournament-card {
  margin-bottom: 30px;
}
</style>