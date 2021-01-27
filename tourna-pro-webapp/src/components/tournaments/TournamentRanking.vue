<template>
  <div class="ranking-container">
    <table>
      <tr>
        <th class>#</th>
        <th>Nome</th>
        <th v-for="stat in ranking.stats" :key="stat.key">{{ stat.name }}</th>
      </tr>
      <tr v-for="(participant, rank) in ranking.ranking" :key="participant.id">
        <td class="rank">
          {{ rank + 1 }}
        </td>
        <td>
          {{ participantName(participant.id) }}
        </td>
        <td v-for="stat in participant.stats" :key="stat.key">
          {{ stat.value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import utils from '../../utils/participant-utils'
export default {
  props: {
    ranking: Object,
    participants: Object
  },
  methods: {
    participantName(id) {
      return utils.findParticipantName(this.participants, id)
    }
  }
}
</script>

<style lang="scss" scoped>

.ranking-container {
  height: 100%;
}

table {
  width: 100%;
  padding: 0px 10px;
  font-size: 1.1rem;
  min-height: 100%;
}

td, th {
  padding: 10px;

  &.rank {
    font-weight: bold;
  }
}

tr:nth-child(odd) {
  background-color: #eeeeee;
}

$border: 2px solid #666666;
th {
  background-color: $color-secondary2;
  color: $color-secondary2-text;
}

td {
  color: #333333;
}
</style>