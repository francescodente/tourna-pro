<template>
  <div>
    <h1>Le mie squadre</h1>
    <div class="teams-container">
      <team-card :team="team" v-for="team in myTeams" :key="team.id" @click="teamClicked(team)" />
    </div>
    <floating-button icon="fas fa-plus" />
  </div>
</template>

<script>
import TeamCard from '../../components/teams/TeamCard.vue'
import FloatingButton from '../../components/ui/FloatingButton.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { TeamCard, FloatingButton },
  methods: {
    teamClicked() {
      
    },
    ...mapActions(['fetchTeams'])
  },
  computed: mapGetters(['myTeams']),
  created() {
    this.fetchTeams()
  }
}
</script>

<style lang="scss" scoped>
.teams-container {
  padding: 10px;
}
</style>