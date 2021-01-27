<template>
  <div class="main">
    <h1>Le mie squadre</h1>
<<<<<<< HEAD
    <grid-container>
      <team-card
        class="card"
        :team="team"
        v-for="team in teams"
        :key="team.id"
        @click="teamClicked(team)"
      />
    </grid-container>
=======
    <teams-search v-slot="scope">
      <team-card :team="scope.team"/>
    </teams-search>
>>>>>>> 7ace10cbc4aaffae896e7f4f55a0b9e986cb3451
    <floating-button
      icon="fas fa-plus"
      @click="$router.push({ name: 'TeamCreate' })"
    />
  </div>
</template>

<script>
import TeamCard from "../../components/teams/TeamCard.vue";
import FloatingButton from "../../components/ui/FloatingButton.vue";
<<<<<<< HEAD
import dataAccess from "@/data-access";
import GridContainer from '../../components/teams/GridContainer.vue';
export default {
  components: { TeamCard, FloatingButton, GridContainer },
  data() {
    return {
      teams: [],
    };
  },
  async created() {
    this.teams = await dataAccess.teams.getAll({
      user: this.$store.getters.userId,
    });
  },
=======
import TeamsSearch from '../../components/teams/TeamsSearch.vue';
export default {
  components: { TeamCard, FloatingButton, TeamsSearch }
>>>>>>> 7ace10cbc4aaffae896e7f4f55a0b9e986cb3451
};
</script>

<style lang="scss" scoped>
h1 {
  color: $color-complementary;
}
.main {
  padding: 10px 20px;
}
</style>