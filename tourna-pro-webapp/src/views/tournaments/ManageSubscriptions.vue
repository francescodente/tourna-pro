<template>
  <div class="main">
    <headline class="headline">Richieste di iscrizione </headline>
    <arrow-button v-for="r in requests" :key="r.id" :text="r.displayText">
      <div :class="r.status">
        {{ r.status }}
      </div>
    </arrow-button>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import ArrowButton from '../../components/tournaments/ArrowButton.vue';
import Headline from '../../components/tournaments/tournament-details/Headline.vue';
export default {
  components: {ArrowButton, Headline },
  name: "ManageSubscription",
  data: function () {
    return {
      requests:[]
    }
  },
  methods: {
    async requestDisplayText(r){
      switch(r.type){
        case 'TEAM': {
          let team = await dataAccess.teams.get(r.teamId)
          return team.name
        }
        case 'PERSON': {
          //let person = await dataAccess.persons.get(r.personId)
          return "person"
        }
        case 'USER': {
          let user = await dataAccess.users.get(r.personId)
          return user.firstName + " " + user.lastName
        }
      }
    }
  },
  async created(){
    let rawRequests = await dataAccess.participationRequests.getAll(this.$route.params.id)
    for(var r of rawRequests) {
      r['displayText'] = await this.requestDisplayText(r)
    };
    this.requests = rawRequests;
  }
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  width: 90%;
  margin-left:5%;

}
</style>