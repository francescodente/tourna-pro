<template>
  <div>
  <tab-view>
    <tab title="Attivi" :selected="true" :color="colorActive">
      <active-tournaments-tab :tournaments="tournaments" />
    </tab>
    <tab title="Futuri"  :color="colorFuture" >
      <future-tournaments-tab :tournaments="tournaments"/>
    </tab>
    <tab title="Crea nuovo" :color="colorNew" >
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
import style from '../../style/export.scss'
export default {
  components: { ActiveTournamentsTab, FutureTournamentsTab,CreateNewTournamentTab, TabView, Tab },
  name: 'MyTournaments',
  data: function() {
    return {
      colorActive: style.colorComplementary,
      colorFuture: style.colorSecondary1,
      colorNew: style.colorSecondary2,
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
          "type":"team",
          "activity":"calcetto"
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
          "type":"single",
          "activity":"basket"
        }
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
</style>