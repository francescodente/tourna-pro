<template>
  <grid-container>
    <tournament-card
      v-for="tournament in tournaments"
      :key="tournament.id"
      :status="tournament.status"
      :tournament="tournament"
    />
  </grid-container>
</template>

<script>
import GridContainer from '../teams/GridContainer.vue'
import TournamentCard from './TournamentCard.vue'
export default {
  components: { GridContainer, TournamentCard },
  props: {
    tournaments: Array
  }
}
</script>
