<template>
  <div class="main">
    <detail-row title="Modalità" :value="tournament.type"/>
    <detail-row title="Attività" :value="tournament.activityId"/>
    <detail-row title="Partecipanti" :value="`${tournament.currentParticipants}/${tournament.maxParticipants}`"/>
    <detail-row title="Genere" :value="tournament.gender"/>
    <detail-row title="Età" :value="`${tournament.minAge} - ${tournament.maxAge}`"/>
    <detail-row title="Luogo" :value="tournament.location"/>
    <detail-row title="Data" :value="tournament.date | dateFormat"/>

  <div v-if="tournament.status == 'active'" class="match-link">
    <router-link tag="div" :to="this.$route.path +'/matches'">Vai alle partite</router-link>
  </div>
  </div>
</template>

<script>
import DetailRow from './DetailRow.vue'

export default {
  components: { DetailRow },
  name: 'DetailsTab',
  props: {
    tournament: Object
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 90%;
  margin-left:5%;
  padding-top:20px;
}

.match-link {
  text-decoration: underline;
}
</style>