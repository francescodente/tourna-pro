<template>
  <div class="main">
    <detail-row title="Modalità" :value="details.type"/>
    <detail-row title="Attività" :value="details.activity"/>
    <detail-row title="Partecipanti" :value="`${details.partecipants}/${details.total}`"/>
    <detail-row title="Genere" :value="details.gender"/>
    <detail-row title="Età" :value="details.ageGroup"/>
    <detail-row title="Luogo" :value="details.place"/>
    <detail-row title="Data" :value="details.date"/>
  </div>
</template>

<script>
import DetailRow from './DetailRow.vue'

export default {
  components: { DetailRow },
  name: 'DetailsTab',
  props: {
    details: Object
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 90%;
  margin-left:5%;
  padding-top:20px;
}
</style>