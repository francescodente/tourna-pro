<template>
  <div class="list-container">
    <b-collapse v-model="value">
      <div class="status-name">
        {{ statusName }}
      </div>
      <div class="tournaments" v-if="tournaments.length > 0">
        <tournament-list :tournaments="tournaments" />
      </div>
      <placeholder-text v-else text="Ancora nessun torneo" />
    </b-collapse>
  </div>
</template>

<script>
import PlaceholderText from '../ui/PlaceholderText.vue'
import TournamentList from './TournamentList.vue'
export default {
  components: { TournamentList, PlaceholderText },
  props: {
    tournaments: Array,
    statusName: String,
    value: Boolean
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  color: black;

  .status-name {
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
}
</style>