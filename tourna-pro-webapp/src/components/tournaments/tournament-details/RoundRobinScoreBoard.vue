<template>
  <div>
    <table>
      <tr>
        <th>VS</th>
        <th v-for="participant in matches.participants.slice(1).reverse()" :key="participant.id">
          {{ participantName(participant.id) }}
        </th>
      </tr>
      <tr v-for="(participant, i) in matches.participants.slice(0, matches.participants.length - 1)" :key="participant.id">
        <th>
          {{ participantName(participant.id) }}
        </th>
        <td v-for="(score, j) in scoresFor(i)" :key="j">
          {{ score || '-' }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import utils from '../../../utils/participant-utils'
export default {
  props: {
    matches: Object,
    participants: Object
  },
  methods: {
    participantName(id) {
      return utils.findParticipantName(this.participants, id)
    },
    scoresFor(i) {
      const matchContains = id => m => m.participant1 == id || m.participant2 == id
      let pi = this.matches.participants[i]

      let ms = this.matches.rounds.flat().filter(matchContains(pi.id))
      
      let result = []
      for (let j = this.matches.participants.length - 1; j > i; j--) {
        let pj = this.matches.participants[j]
        let m = ms.find(matchContains(pj.id))
        if (m && m.result) {
          result.push(this.scoreText(m, pi.id))
        } else {
          result.push(null)
        }
      }
      return result
    },
    scoreText(match, id) {
      let first
      let second
      if (match.participant1 == id) {
        first = match.result.participant1.score
        second = match.result.participant2.score
      } else {
        first = match.result.participant2.score
        second = match.result.participant1.score
      }
      return `${first} - ${second}`
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  padding: 0px 10px;
  font-size: 1.1rem;
}

$border: 1px solid $color-secondary2;
td, th {
  padding: 10px;
  border: $border;
  &.rank {
    font-weight: bold;
  }
}

th {
  background-color: $color-secondary2;
  color: $color-secondary2-text;
  // border-bottom: $border;
  // border-top: $border;
}

td {
  color: #333333;
}
</style>