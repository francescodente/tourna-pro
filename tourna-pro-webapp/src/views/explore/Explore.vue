<template>
  <div class="main">
    <tournament-card
      class="tournament-card"
      v-for="tournament in tournaments"
      :key="tournament.id"
      status="exploring"
      :tournament="tournament"
    />
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import TournamentCard from '../../components/tournaments/TournamentCard.vue';
import { mapGetters } from 'vuex';
export default {
  components: {TournamentCard },
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
      activities: JSON.stringify(interests),
      gender: user.gender
    }
    this.tournaments = await dataAccess.tournaments.getAll(filters)
    this.tournaments = this.tournaments.filter(x => x.subscribed == 'NONE').filter(x => !x.owned)
  }
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 30px 20px;
}
</style>