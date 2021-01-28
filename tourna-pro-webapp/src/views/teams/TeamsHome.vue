<template>
  <div class="main">
    <h1>Le mie squadre</h1>
    <teams-search v-slot="scope">
      <team-card :team="scope.team"/>
    </teams-search>
    <floating-button
      icon="fas fa-plus"
      @click="$router.push({ name: 'TeamCreate' })"
    />
  </div>
</template>

<script>
import TeamCard from "../../components/teams/TeamCard.vue";
import FloatingButton from "../../components/ui/FloatingButton.vue";
import TeamsSearch from '../../components/teams/TeamsSearch.vue';
export default {
  components: { TeamCard, FloatingButton, TeamsSearch }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px 20px;
}
</style>