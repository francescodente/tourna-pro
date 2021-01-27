<template>
  <div class="main">
    <arrow-button
      v-for="m in lastRound"
      :key="m.id"
      :text="`${participantName(m.participant1)} vs ${participantName(m.participant2)}`"
    >
      <div :class="m.status">
        {{ rightText(m) }}
      </div>
    </arrow-button>
  </div>
</template>

<script>
import matchUtils from "@/utils/participant-utils";
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
export default {
  components: { ArrowButton, Headline },
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
      if (m.status == "STARTED") {
        return `${m.points_home}-${m.points_guest}`;
      } else {
        return m.status;
      }
    },
  },
  computed: {
    lastRound: function () {
      return this.matches.rounds[this.matches.rounds.length - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.headline {
  width: 90%;
  margin: 10px 5%;
}

.PENDING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}
</style>
