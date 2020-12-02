<template>
  <div class="bg">
    <div v-for="tournament in tournaments" :key="tournament.id">
      <tournament-card status="active" :tournament="tournament"/>
    </div>
  </div>
</template>

<script>
import TournamentCard from '../ui/TournamentCard.vue'
export default {
  components: { TournamentCard },
  name: 'ActiveTournamentsTab',
  props: {
    tournaments: Array
  }
}
</script>

<style lang="scss" scoped>
.bg {
  padding-top:4%;
  background-color: $color-complementary-background;
}
</style>