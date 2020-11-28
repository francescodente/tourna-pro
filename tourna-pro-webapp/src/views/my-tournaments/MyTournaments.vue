<template>
  <div>
  <tab-view content-class="mt-3" justified>
    <tab title="Attivi" :selected="true">
      <active-tournaments-tab :tournaments="tournaments" />
    </tab>
    <tab title="Futuri">
      <future-tournaments-tab :tournaments="tournaments" />
    </tab>
    <tab title="Crea nuovo">
      <create-new-tournament-tab/>
    </tab>
  </tab-view>
</div>
</template>

<script>
import ActiveTournamentsTab from '../../components/my-tournaments/ActiveTournamentsTab.vue'
import CreateNewTournamentTab from '../../components/my-tournaments/CreateNewTournamentTab.vue'
import FutureTournamentsTab from '../../components/my-tournaments/FutureTournamentsTab.vue'
import Tab from '../../components/ui/TabView/Tab.vue'
import TabView from '../../components/ui/TabView/TabView.vue'

export default {
  components: { ActiveTournamentsTab, FutureTournamentsTab,CreateNewTournamentTab, TabView, Tab },
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


<style lang="scss" scoped>

</style>