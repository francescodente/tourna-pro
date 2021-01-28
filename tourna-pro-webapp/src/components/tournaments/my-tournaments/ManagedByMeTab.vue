<template>
  <div class="bg">
    <tournaments-by-status :tournaments="tournaments" />
  </div>
</template>

<script>
import TournamentsByStatus from '../TournamentsByStatus.vue';
export default {
  components: { TournamentsByStatus },
  name: "ManagedByMeTab",
  props: {
    tournaments: Array,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 20px;
}
</style>