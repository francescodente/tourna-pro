<template>
  <div class="bg">
    <div v-if="waiting" class="waiting">
      <router-link :to="this.$route.path + '/requests'" tag="div">
        Mostra richieste in sospeso
        <i class="fas fa-angle-right"></i>
      </router-link>
    </div>
    <tournaments-by-status :tournaments="tournaments" />
  </div>
</template>

<script>
import GridContainer from '../../teams/GridContainer.vue';
import TournamentCard from "../TournamentCard.vue";
import TournamentList from '../TournamentList.vue';
import TournamentsByStatus from '../TournamentsByStatus.vue';
export default {
  components: { TournamentCard, GridContainer, TournamentList, TournamentsByStatus },
  name: "SubscribedToTab",
  props: {
    tournaments: Array,
    waiting: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  padding: 20px;
}

.waiting {
  text-decoration: underline;
  color: $color-primary;
}

.tournament-card {
  padding: 20px;
}
</style>