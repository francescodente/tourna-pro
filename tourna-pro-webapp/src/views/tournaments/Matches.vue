<template>
  <div class="main">
    <yes-no-popup ref="yes-no" />
    <b-modal
      ref="inputResult"
      centered
      scrollable
      title="Inserisci il risultato"
      @hide="checkHidden"
      cancel-variant="danger"
      ok-variant="success"
      cancel-title="Annulla"
    >
      <div class="result-inputs">
        <div class="participant-input">
          <span v-if="currentMatch" class="input-name">{{ participantName(currentMatch.participant1) }}</span>
          <input class="inputModal" type="number" v-model="score1"/>
        </div>
        <div class="participant-input">
          <span v-if="currentMatch" class="input-name">{{ participantName(currentMatch.participant2) }}</span>
          <input class="inputModal" type="number" v-model="score2"/>
        </div>
      </div>
    </b-modal>

    <action-button class="end-round" actionName="Concludi il round" icon="fas fa-check" @trigger="endRound" v-if="canBeEnded" />
    
    <list-item v-for="m in lastRound" :canSelect="true" :key="m.id" @selected="clickMatch(m)">
      <div class="content">
        <div>
          <strong>{{ participantName(m.participant1) }}</strong>
          vs
          <strong>{{ participantName(m.participant2) }}</strong>
        </div>
        <div :class="m.result ? '' : m.status">
          {{ rightText(m) }}
        </div>
      </div>
    </list-item>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import matchUtils from "@/utils/participant-utils";
import ListItem from "../../components/ui/ListItem.vue";
import YesNoPopup from '../../components/ui/YesNoPopup.vue';
import ActionButton from '../../components/ui/ActionButton.vue';
export default {
  components: { ListItem, YesNoPopup, ActionButton },
  name: "Matches",
  props: {
    matches: Object,
    participants: Object,
  },
  data: function () {
    return {
      score1: 0,
      score2: 0,
      currentMatch: null
    };
  },
  methods: {
    async endRound() {
      let result = await this.$refs['yes-no'].show(
        'Concludere il round corrente?',
        'I risultati non potranno più essere modificati.')
      if (!result) {
        return
      }
      await dataAccess.matches.startRound(this.$route.params.id)
      this.$router.go(0)
    },
    participantName(id) {
      return matchUtils.findParticipantName(this.participants, id);
    },
    rightText: function (m) {
      if (m.result) {
        return `${m.result.participant1.score}-${m.result.participant2.score}`;
      } else {
        if (m.status == 'PENDING') {
          return 'AVVIA QUESTO MATCH'
        } else if (m.status == 'STARTED') {
          return 'INSERISCI RISULTATO'
        }

      }
    },
    async clickMatch(match){
      if(match.status == 'PENDING'){
        let res = await this.$refs['yes-no'].show("Avvia il match", 
        "Tutti i partecipanti di questo match riceveranno una notifica")
        if(res){
          await dataAccess.matches.startMatch(this.$route.params.id, match.id)
        }
        match.status = 'STARTED'
      } else {
        this.currentMatch = match
        this.score1 = match.result ? match.result.participant1.score : 0
        this.score2 = match.result ? match.result.participant2.score : 0
        this.$refs['inputResult'].show()
      }
    },
    async checkHidden(event){
      if(event.trigger == 'ok'){
        await this.onScoreSubmit()
      }
    },
    async onScoreSubmit(){
      let result = {
        participant1: this.score1,
        participant2: this.score2,
      }
      let updatedMatch = await dataAccess.matches.update(this.$route.params.id, this.currentMatch.id, result)
      this.currentMatch.result = updatedMatch.result
    }
  },
  computed: {
    lastRound: function () {
      return this.matches.rounds[this.matches.rounds.length - 1];
    },
    canBeEnded() {
      return this.lastRound.every(m => m.result != null)
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  width:100%;
  align-items: baseline;
}

.end-round {
  margin-bottom: 20px;
}

.result-inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  .participant-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .input-name {
      margin-bottom: 10px;
      font-size:1.2rem;
      font-weight: bold;
    }
  }
}

.inputModal {
  font-size: 2rem;
  width: 100px;
  text-align: center;
}

.PENDING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}

.STARTED {
  color: $color-complementary;
  font-size: 9pt;
  font-weight: bold;
}
</style>
