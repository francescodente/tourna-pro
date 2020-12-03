<template>
  <div>
  <tab-view>
    <tab title="Attivi" :selected="true" :color="style.colorComplementary">
      <active-tournaments-tab :tournaments="tournaments" />
    </tab>
    <tab title="Futuri"  :color="style.colorSecondary1" >
      <future-tournaments-tab :tournaments="tournaments" :waiting="waiting"/>
    </tab>
    <tab title="Crea nuovo" :color="style.colorSecondary2" >
      <create-new-tournament-tab/>
    </tab>
  </tab-view>
</div>
</template>

<script>
import ActiveTournamentsTab from '../../components/tournaments/my-tournaments/ActiveTournamentsTab.vue'
import CreateNewTournamentTab from '../../components/tournaments/my-tournaments/CreateNewTournamentTab.vue'
import FutureTournamentsTab from '../../components/tournaments/my-tournaments/FutureTournamentsTab.vue'
import Tab from '../../components/ui/TabView/Tab.vue'
import TabView from '../../components/ui/TabView/TabView.vue'
import style from '../../style/export.scss'
export default {
  components: { ActiveTournamentsTab, FutureTournamentsTab,CreateNewTournamentTab, TabView, Tab },
  name: 'MyTournaments',
  data: function() {
    return {
      style,
      waiting: [
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
        }],
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