<template>
  <div class="bg">
    <tournament-card class="tournament-card"
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
  name: "ManagedByMeTab",
  props: {
    tournaments: Array
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 30px 20px;
}

.tournament-card{
  margin-bottom: 30px;
}
</style>