<template>
  <div>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="Attivi" active>
      <active-tournaments-tab :tournaments="tournaments" />
    </b-tab>
    <b-tab title="Futuri">
      <future-tournaments-tab :tournaments="tournaments" />
    </b-tab>
    <b-tab title="Crea nuovo">
      <create-new-tournament-tab/>
    </b-tab>
  </b-tabs>
</div>
</template>

<script>
import ActiveTournamentsTab from '../../components/my-tournaments/ActiveTournamentsTab.vue'
import CreateNewTournamentTab from '../../components/my-tournaments/CreateNewTournamentTab.vue'
import FutureTournamentsTab from '../../components/my-tournaments/FutureTournamentsTab.vue'

export default {
  components: { ActiveTournamentsTab, FutureTournamentsTab,CreateNewTournamentTab },
  name: 'MyTournaments',
  data: function() {
    return {
      tournaments: [
        {
          "id":1,
          "name":"Torneo di prova con nome lungo",
          "ageGroup":"Under 24",
          "gender":"Maschile",
          "place":"Palazzetto dello Sport",
          "date":"10/12/2020",
          "partecipants":2,
          "total":5,
          "type":"team"
        },
        {
          "id":2,
          "name":"Torneo di prova 2",
          "ageGroup":"Under 24",
          "gender":"Maschile",
          "place":"Palazzetto dello Sport",
          "date":"10/12/2020",
          "partecipants":2,
          "total":5,
          "type":"single"
        }
      ]
    }
  }
}
</script>