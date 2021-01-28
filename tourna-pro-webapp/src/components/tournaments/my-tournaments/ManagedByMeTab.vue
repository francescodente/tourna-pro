<template>
  <div class="bg">
    <tournament-list :tournaments="tournaments" />
  </div>
</template>

<script>
import GridContainer from "../../teams/GridContainer.vue";
import TournamentCard from "../TournamentCard.vue";
import TournamentList from '../TournamentList.vue';
export default {
  components: { TournamentCard, GridContainer, TournamentList },
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