<template>
  <div class="bg">
    <div v-if="waiting" class="waiting">
      <router-link tag="div" to="???">
        Mostra tornei in sospeso
        <i class="fas fa-angle-right"></i>
      </router-link>
    </div>
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
    tournaments: Array,
    waiting: Array
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: $color-secondary1-background;
}

.waiting{
  background-color: $color-secondary1-lightest;
  color: $color-primary;
  padding:7px;
  margin-bottom: 4%;
}
</style>