<template>
  <div class="main">
    <h1>Esplora Tornei</h1>
    <div class="tournaments">
    <grid-container>
    <tournament-card
      class="tournament-card"
      v-for="tournament in tournaments"
      :key="tournament.id"
      status="exploring"
      :tournament="tournament"
    />
    </grid-container>
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import TournamentCard from '../../components/tournaments/TournamentCard.vue';
import { mapGetters } from 'vuex';
import GridContainer from '../../components/teams/GridContainer.vue';
export default {
  components: {TournamentCard, GridContainer},
  name: "Explore",
  data: function () {
    return {
     tournaments: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  async created(){
    let user = await dataAccess.users.getUser(this.userId)
    let interests = await dataAccess.interests.getAll(this.userId)
    let filters = {
      from: new Date(),
      status: 'PENDING',
      activities: interests.length > 0 ? JSON.stringify(interests) : undefined,
      gender: user.gender
    }
    this.tournaments = await dataAccess.tournaments.getAll(filters)
    this.tournaments = this.tournaments.filter(x => x.subscribed == 'NONE').filter(x => !x.owned)
  }
};
</script>


<style lang="scss" scoped>
.tournaments {
  padding-top: 30px;
}

.main {
  padding: 10px 20px;
}
</style>