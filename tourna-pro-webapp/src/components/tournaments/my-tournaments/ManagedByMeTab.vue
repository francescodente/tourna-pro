<template>
  <div class="bg">
    <div class="tournaments">
      <tournament-card
        class="tournament-card"
        v-for="tournament in tournaments"
        :key="tournament.id"
        :status="tournament.status"
        :tournament="tournament"
      />
    </div>
  </div>
</template>

<script>
import TournamentCard from "../TournamentCard.vue";
export default {
  components: { TournamentCard },
  name: "ManagedByMeTab",
  props: {
    tournaments: Array,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 30px 20px;
}

.tournament-card {
  margin-bottom: 30px;
}

.tournaments {
  display: flex;
  flex-wrap: wrap;
  flex-basis: auto;
  justify-content: space-between;
}
.tournaments > * {
  flex: 0 0 49%;
  margin: 1px;
}
</style>