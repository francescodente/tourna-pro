<template>
  <div class="tournaments-by-status">

    <tournament-list-with-status :tournaments="tournamentsWithStatus('ACTIVE')" statusName="In corso" v-model="showActive" />
    <tournament-list-with-status :tournaments="tournamentsWithStatus('PENDING')" statusName="Futuri" v-model="showPending" />
    <tournament-list-with-status :tournaments="tournamentsWithStatus('ENDED')" statusName="Terminati" v-model="showEnded" />
  </div>
</template>

<script>
import SimpleCheckbox from '../ui/SimpleCheckbox.vue'
import TournamentListWithStatus from './TournamentListWithStatus.vue'

export default {
  components: { TournamentListWithStatus, SimpleCheckbox },
  props: {
    tournaments: Array
  },
  data() {
    return {
      showActive: this.tournamentsWithStatus('ACTIVE').length > 0,
      showPending: this.tournamentsWithStatus('PENDING').length > 0,
      showEnded: this.tournamentsWithStatus('ACTIVE').length == 0 && this.tournamentsWithStatus('PENDING').length == 0,
    }
  },
  methods: {
    tournamentsWithStatus(status) {
      return this.tournaments.filter(t => t.status == status)
    }
  }
}
</script>

<style lang="scss" scoped>
.togglers {
  color: $color-default-text;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>