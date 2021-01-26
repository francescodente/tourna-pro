<template>
  <bracket :rounds="rounds">
    <template slot="player" slot-scope="scope">
      <div class="player-slot">
        <div class="player-slot-name">{{ scope.player.name }}</div>
        <div class="player-slot-score">{{ scope.player.score == undefined ? '-' : scope.player.score }}</div>
      </div>
    </template>
  </bracket>
</template>

<script>
import Bracket from "vue-tournament-bracket";

export default {
  components: { Bracket },
  props: {
    matches: Object
  },
  methods: {
    toParticipantModel(match, key) {
      let name = 'BYE'
      let participant = this.matches.participants.find(x => x.id == match[key])
      if (participant && participant.status == 'RETIRED') {
        name = 'RITIRATO'
      } else if (participant) {
        name = match[key]
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
          player1: { id: '', name: '-' },
          player2: { id: '', name: '-' }
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
.player-slot {
  width: 160px;
  text-overflow: ellipsis;
  overflow: hidden;
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

.vtb-item-players {
  background-color: #cccccc;
  .winner {
    background-color: $color-secondary2;
    &.highlight {
      background-color: $color-secondary2;
    }
  }

  .defeated {
    background-color: #cccccc;
    &.highlight {
      background-color: #cccccc;
    }
  }
}
</style>