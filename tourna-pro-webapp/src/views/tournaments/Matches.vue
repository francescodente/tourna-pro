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
    
    <input class="inputModal" type="number" v-model="score1"/>
    -
    <input class="inputModal" type="number" v-model="score2"/>
    </b-modal>
    <list-item v-for="m in lastRound" :canSelect="true" :key="m.id"
      @selected="clickMatch(m)"
    >
      <div class="content">
        <div>
          {{ participantName(m.participant1) }} vs {{ participantName(m.participant2) }}
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
export default {
  components: { ListItem, YesNoPopup },
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
    participantName(id) {
      return matchUtils.findParticipantName(this.participants, id);
    },
    rightText: function (m) {
      if (m.result) {
        return `${m.result.participant1.score}-${m.result.participant2.score}`;
      } else {
        return m.status;
      }
    },
    async clickMatch(match){
      if(match.status == 'PENDING'){
        let res = await this.$refs['yes-no'].show("Avvia il match", 
        "Tutti i partecipanti di questo match riceveranno una notifica")
        if(res){
          await dataAccess.matches.startMatch(this.$route.params.id, match.id)
        }
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
