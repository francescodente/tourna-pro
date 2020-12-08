<template>
  <div class="bg">
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
  name: "ManagedByMeTab",
  props: {
    tournaments: Array
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 0% 3%;
  padding-top: 5%;
}

.waiting {
  text-decoration: underline;
  color: $color-primary;
  padding: 7px;
  margin: 10px 0px;
}
</style>