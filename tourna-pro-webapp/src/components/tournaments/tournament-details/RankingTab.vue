<template>
  <div class="main">
    <tournament-ranking :ranking="ranking" />
  </div>
</template>

<script>
import TournamentRanking from '../TournamentRanking.vue'

export default {
  components: { TournamentRanking },
  props: {
    ranking: Object
  }
}
</script>

<style lang="scss" scoped>

</style>