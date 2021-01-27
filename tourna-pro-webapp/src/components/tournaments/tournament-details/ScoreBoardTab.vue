<template>
  <div class="score-board-container">
    <knockout-score-board
      v-if="matches.type == 'KNOCKOUT'"
      :matches="matches"
      :participants="participants"
    />

    <round-robin-score-board
      v-if="matches.type == 'ROUND_ROBIN'"
      :matches="matches"
      :participants="participants"
    />
  </div>
</template>

<script>
import KnockoutScoreBoard from './KnockoutScoreBoard.vue';
import RoundRobinScoreBoard from './RoundRobinScoreBoard.vue';

export default {
  components: { KnockoutScoreBoard, RoundRobinScoreBoard },
  name: "ScoreBoardTab",
  props: {
    participants: Object,
    matches: Object
  }
};
</script>

<style lang="scss" scoped>
.score-board-container {
  height: 100%;
  overflow: auto;
}
</style>