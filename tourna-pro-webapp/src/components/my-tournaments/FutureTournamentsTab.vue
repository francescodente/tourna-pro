<template>
  <div class="bg">
    <div v-for="tournament in tournaments" :key="tournament.id">
      <tournament-card status="future" :tournament="tournament"/>
    </div>
  </div>
</template>

<script>
import TournamentCard from '../ui/TournamentCard.vue'
export default {
  components: { TournamentCard },
  name: 'FutureTournamentsTab',
  props: {
    tournaments: Array
  }
}
</script>

<style lang="scss" scoped>
.bg {
  padding-top:10px;
  background-color: $color-secondary1-background;
}
</style>