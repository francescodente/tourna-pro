<template>
  <div class="bracket-container">
    <bracket :rounds="rounds">
      <template slot="player" slot-scope="scope">
        <div class="player-slot">
          <div v-if="!scope.player.idle" class="player-slot-active">
            <div class="player-slot-name">{{ scope.player.name }}</div>
            <div class="player-slot-score">{{ scope.player.score == undefined ? '-' : scope.player.score }}</div>
          </div>
          <div v-else>
            -
          </div>
        </div>
      </template>
    </bracket>
  </div>
</template>

<script>
import Bracket from "vue-tournament-bracket";
import utils from '../../../utils/participant-utils'

export default {
  components: { Bracket },
  props: {
    matches: Object,
    participants: Object
  },
  methods: {
    toParticipantModel(match, key) {
      let name
      let participant = this.matches.participants.find(x => x.id == match[key])
      if (participant && participant.status == 'RETIRED') {
        name = 'RITIRATO'
      } else {
        name = utils.findParticipantName(this.participants, match[key])
      }
      return {
        id: match[key] || 'null',
        name: name,
        score: match.result ? match.result[key].score : undefined,
        winner: match.result ? match.result.winner == key : undefined
      }
    },
    toMatchModel(match) {
      return {
        player1: this.toParticipantModel(match, 'participant1'),
        player2: this.toParticipantModel(match, 'participant2')
      }
    },
    toRoundModel(round) {
      return {
        games: round.map(this.toMatchModel)
      }
    }
  },
  computed: {
    rounds() {
      let currentRounds = this.matches.rounds.map(this.toRoundModel)

      let lastRound = currentRounds[currentRounds.length - 1]
      while (lastRound.games.length > 1) {
        let games = new Array(lastRound.games.length / 2).fill(null).map(() => ({
          player1: { id: '', name: '', idle: true },
          player2: { id: '', name: '', idle: true }
        }))
        lastRound = { games }
        currentRounds.push(lastRound)
      }
      return currentRounds
    }
  }
}
</script>

<style lang="scss">

.bracket-container {
  padding: 0px 20px;
  overflow: auto;
  height: 100%;
  width: 100%;
}

.player-slot {
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  

  .player-slot-active {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .player-slot-name {
      flex-grow: 0;
      flex-shrink: 1;
    }

    .player-slot-score {
      font-size: 1.3rem;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
}

$defeated-color: #bbbbbb;
.vtb-item-players {
  background-color: $color-secondary2;
  .winner {
    background-color: $color-secondary2;
    &.highlight {
      background-color: $color-secondary2;
    }
  }

  .defeated {
    background-color: $defeated-color;
    &.highlight {
      background-color: $defeated-color;
    }
  }
}
</style>