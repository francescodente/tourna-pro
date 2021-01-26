<template>
  <div class="main">
    <tournament-ranking :ranking="ranking" :participants="participants" />
  </div>
</template>

<script>
import TournamentRanking from '../TournamentRanking.vue'

export default {
  components: { TournamentRanking },
  props: {
    ranking: Object,
    participants: Object
  }
}
</script>

<style lang="scss" scoped>

</style>