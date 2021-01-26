<template>
  <div>
    <knockout-score-board v-if="matches.type == 'KNOCKOUT'" :matches="matches"/>
    <round-robin-score-board v-if="matches.type == 'ROUND_ROBIN'" :matches="matches"/>
  </div>
</template>

<script>
import KnockoutScoreBoard from './KnockoutScoreBoard.vue';
import RoundRobinScoreBoard from './RoundRobinScoreBoard.vue';

export default {
  components: { KnockoutScoreBoard, RoundRobinScoreBoard },
  name: "ScoreBoardTab",
  props: {
    matches: Object
  }
};
</script>

<style lang="scss">

</style>