<template>
  <div class="main">
    <yes-no-popup ref="yes-no" />
    <b-modal
      ref="ownersModal"
      centered
      scrollable
      title="Chiama un organizzatore"
    >
      <div class="ownerRow" v-for="o in owners" :key="o.id">
        <user-line :user="o" :canDelete="false" class="user" />
        <a class="button" :href="'tel:' + o.telephone"
          ><i class="fa fa-phone-alt"></i
        ></a>
        <a class="button" :href="'mailto:' + o.email"
          ><i class="fa fa-envelope"></i
        ></a>
      </div>
    </b-modal>
    <list-item v-for="m in lastRound" :key="m.id"
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
    return {};
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
    clickMatch(match){
      if(m.status == 'PENDING'){
        let res = await this.$refs['yes-no'].show("Avvia il match", 
        "Tutti i partecipanti di questo match riceveranno una notifica")
        if(res){
          await dataAccess.matches.startMatch(this.$route.id, match.id)
        }
      } else {

      }
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

.PENDING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}
</style>
