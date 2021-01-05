<template>
  <div class="main">
    <h1>Le mie squadre</h1>
    <div class="teams-container">
      <team-card class="card" :team="team" v-for="team in getTeams" :key="team.id" @click="teamClicked(team)" />
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
  computed: mapGetters(['getTeams']),
  created() {
    this.fetchTeams()
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: $color-complementary;
}
.main{
  padding-top: 10px;
  width: 90%;
  margin-left: 5%;
}
</style>