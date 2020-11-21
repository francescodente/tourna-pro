<template>
  <div>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="Attivi" active><active-tournaments-tab/></b-tab>
    <b-tab title="Futuri"><future-torunaments-tab/></b-tab>
    <b-tab title="Crea nuovo"><create-new-tournament-tab/></b-tab>
  </b-tabs>
</div>
</template>

<script>
import ActiveTournamentsTab from '../../components/my-tournaments/ActiveTournamentsTab.vue'
import CreateNewTournamentTab from '../../components/my-tournaments/CreateNewTournamentTab.vue'
import FutureTorunamentsTab from '../../components/my-tournaments/FutureTorunamentsTab.vue'

export default {
  components: { ActiveTournamentsTab, FutureTorunamentsTab,CreateNewTournamentTab },
  name: 'MyTournaments'
}
</script>