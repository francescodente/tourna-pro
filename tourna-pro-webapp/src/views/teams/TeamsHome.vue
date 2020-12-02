<template>
  <div>
    <h1>Le mie squadre</h1>
    <div class="teams-container">
      <team-card :team="team" v-for="team in teams" :key="team.id" @click="teamClicked(team)" />
    </div>
    <floating-button icon="fas fa-plus" />
  </div>
</template>

<script>
import TeamCard from '../../components/teams/TeamCard.vue'
import FloatingButton from '../../components/ui/FloatingButton.vue'
export default {
  components: { TeamCard, FloatingButton },
  data() {
    return {
      teams: [
        {
          id: 1,
          name: 'Inazuma Eleven',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 11
        },
        {
          id: 2,
          name: 'Rin Tin Team',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 12
        },
        {
          id: 3,
          name: 'Rin Tin Team',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 12
        },
        {
          id: 4,
          name: 'Rin Tin Team',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 12
        },
        {
          id: 5,
          name: 'Rin Tin Team',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 12
        },
        {
          id: 6,
          name: 'Rin Tin Team',
          image: 'https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg',
          members: 12
        }
      ]
    }
  },
  methods: {
    teamClicked() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.teams-container {
  padding: 10px;
}
</style>