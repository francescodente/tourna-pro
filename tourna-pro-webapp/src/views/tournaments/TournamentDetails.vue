<template>
  <div class="container">
    <headline> {{tournament.name}} </headline>
    <div class="text">
      {{tournament.description}}
    </div>
    <tab-view>
    </tab-view>
  </div>
</template>

<script>
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import TabView from '../../components/ui/TabView/TabView.vue';
export default {
  data: function() {
    return {
      tournament: {
          "id": 1,
          "name":"Torneo di prova con nome lungo",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum purus at aliquet pharetra. Integer feugiat in mi sed tempor. Integer varius sollicitudin augue et auctor. Nunc finibus mollis nisi, posuere gravida enim euismod id. Sed lobortis, mi vel pulvinar varius, quam neque feugiat risus, vitae lobortis magna tortor eu sapien. ",
          "ageGroup":"Under 24",
          "gender":"Maschile",
          "place":"Palazzetto dello Sport",
          "date":"10/12/2020",
          "partecipants":2,
          "total":5,
          "type":"team",
          "activity":"calcetto"
        }
    }
  },
  components: { Headline, TabView },
  name: "TournamentDetails",
};
</script>

<style lang="scss" scoped>
.text {
  text-align:left;
  font-size: 10pt;
}
</style>