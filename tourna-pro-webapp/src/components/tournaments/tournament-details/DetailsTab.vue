<template>
  <div class="main">
    <div class="tournament-description">
      <div class="tournament-description-title">Descrizione</div>
      {{ tournament.description }}
    </div>
    <detail-row title="Modalità" :value="tournament.type | tournamentType"/>
    <detail-row title="Attività" :value="tournament.activityId | activityFromId"/>
    <detail-row title="Numero di partecipanti" :value="`${tournament.currentParticipants}/${tournament.maxParticipants}`"/>
    <detail-row title="Categoria" :value="tournament.gender | gender"/>
    <detail-row title="Luogo" :value="tournament.location"/>
    <detail-row title="Data" :value="tournament.date | dateFormat"/>
    <div v-if="tournament.status == 'active'" class="match-link">
      <router-link tag="div" :to="this.$route.path +'/matches'">Vai alle partite</router-link>
    </div>
  </div>
</template>

<script>
import DetailRow from './DetailRow.vue'
import Headline from './Headline.vue'

export default {
  components: { DetailRow, Headline },
  name: 'DetailsTab',
  props: {
    tournament: Object
  }
}
</script>

<style lang="scss" scoped>

.main{
  height: 100%;
  width: 90%;
  margin-left:5%;
  padding-top:20px;
}

.tournament-description {
  margin-bottom: 30px;
  color: black;
  font-size: 1.1rem;
  text-align: left;
  background-color: $color-secondary2-background;
  padding: 10px;

  .tournament-description-title {
    color: $color-secondary2;
  }
}

.match-link {
  text-decoration: underline;
}
</style>