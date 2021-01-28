<template>
  <div class="main">
    <headline class="headline">Richieste di iscrizione</headline>
    <router-link  v-for="r in requests" :key="r.id" :to="requestPath(r)" tag="div">
    <arrow-button :text="r.displayText">
      <div>
        <button class="button approve" v-on:click.prevent @click="approveRequest(r.id)"><i class="fas fa-check"></i></button>
        <button class="button reject" v-on:click.prevent @click="rejectRequest(r.id)"><i class="fas fa-times"></i></button>
      </div>
    </arrow-button>
    </router-link>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import ArrowButton from "../../components/tournaments/ArrowButton.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
export default {
  components: { ArrowButton, Headline },
  name: "ManageSubscription",
  data: function () {
    return {
      requests: [],
    };
  },
  methods: {
    async requestDisplayText(r) {
      switch (r.type) {
        case "TEAM": {
          let team = await dataAccess.teams.get(r.teamId);
          return team.name;
        }
        case "PERSON": {
          //let person = await dataAccess.persons.get(r.personId)
          return "person";
        }
        case "USER": {
          let user = await dataAccess.users.getUser(r.userId);
          return user.firstName + " " + user.lastName;
        }
      }
    },
    requestPath(r){
      switch (r.type) {
        case "TEAM": {
          return {name: 'TeamDetails', params: {id: r.teamId}};
        }
        case "USER": {
          return {name: 'UserProfile', params: {id: r.userId}};
        }
        default: return "";
      }
    },
    approveRequest(id){
      dataAccess.participationRequests.updateStatus(this.$route.params.id, id, 'APPROVED')
      this.$router.go(0)
    },
    rejectRequest(id){
      dataAccess.participationRequests.updateStatus(this.$route.params.id, id, 'REJECTED')
      this.$router.go(0)
    }
  },
  async created() {
    let rawRequests = await dataAccess.participationRequests.getAll(
      {tournamentId: this.$route.params.id, status: "PENDING" }
    );
    for (var r of rawRequests) {
      r["displayText"] = await this.requestDisplayText(r);
    }
    this.requests = rawRequests;
  },
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 0px 20px;
}

.button {
  color: white;
  border: none;
  border-radius: 10px;
  margin: 5px;
  width: 30px;
  height: 30px;
  outline:none;
}


.approve {
  background-color: $color-complementary;
}

.reject {
  background-color: $color-secondary2;
}
</style>