<template>
  <div class="main">
    <headline class="headline">Stato delle partite: </headline>
    <arrow-button v-for="m in matches" :key="m.id" :text="`${m.team_home} vs ${m.team_guest}`">
      <div :class="m.status">
        {{rightText(m)}}
      </div>
    </arrow-button>
  </div>
</template>

<script>
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
import Headline from '../../components/tournaments/tournament-details/Headline.vue';
export default {
  components: { ArrowButton, Headline },
  name: "Matches",
  data: function () {
    return {
      matches: [
        {
          id: 1,
          team_home: "Rossi",
          team_guest: "Verdi",
          status: "DONE",
          points_home: 1,
          points_guest: 3,
          notes: ""
        },
        {
          id: 2,
          team_home: "Blu",
          team_guest: "Verdi",
          status: "WAITING",
          points_home: 1,
          points_guest: 3,
          notes: ""
        },
      ],
    };
  },
  methods: {
    rightText: function(m) {
      if(m.status == "DONE"){
        return `${m.points_home}-${m.points_guest}`
      } else {
        return m.status
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headline{
  width:90%;
  margin: 10px 5%;
}

.WAITING {
  color: $color-secondary1;
  font-size: 9pt;
  font-weight: bold;
}
</style>
