<template>
  <div class="main">
    <yes-no-popup ref="yes-no" />
    <b-modal ref="ownersModal" centered scrollable title="Chiama un organizzatore">
    <div class="ownerRow" v-for="o in owners" :key="o.id">
    <user-line :user="o" :canDelete="false" class="user"/>
    <a class="button" :href="'tel:'+o.telephone"><i class="fa fa-phone-alt"></i></a>
    <a class="button" :href="'mailto:'+o.email"><i class="fa fa-envelope"></i></a>
    </div>
    </b-modal>
    <div class="owner-actions" v-if="owner">
      <action-button
        actionName="Nomina amministratore"
        icon="fas fa-crown"
        @trigger="nameAdmin"
      />
      <div class="active-tournament" v-if="active">
        <action-button
          actionName="Inserisci risultati"
          icon="fas fa-clipboard-list"
        />
      </div>
      <div class="inactive-tournament" v-if="!active">
        <action-button
          actionName="Aggiungi partecipante non registrato"
          icon="fas fa-user-plus"
          @trigger="addParticipant"
        />
        <action-button
          actionName="Gestisci iscrizioni"
          icon="fas fa-check-square"
          @trigger="manageSubscriptions"
        />
        <action-button
          actionName="Avvia il torneo"
          icon="fas fa-flag"
          @trigger="startTournament"
        />
        <action-button actionName="Modifica il torneo" icon="far fa-edit" />
        <action-button
          actionName="Elimina il torneo"
          icon="far fa-trash-alt"
          @trigger="deleteTournament"
        />
      </div>
    </div>
    <div class="user-actions" v-if="!owner">
      <div class="unsubscribed-actions" v-if="canSubscribe">
        <action-button
          actionName="Iscriviti al torneo"
          icon="far fa-check-square"
          @trigger="requestSubscription"
        />
      </div>
      <div class="subscribed-actions" v-if="canRetire">
        <action-button
          actionName="Ritirati dal torneo"
          icon="fas fa-times"
          @trigger="retireFromTournament"
        />
        <div class="active-tournament" v-if="active">
          <action-button
            actionName="Visualizza partite"
            icon="fas fa-clipboard-list"
          />
        </div>
      </div>
      <action-button
        actionName="Contatta l'organizzatore"
        icon="fas fa-phone-alt"
        @trigger="showOwnerContacts"
      />
    </div>
    <div class="base-actions">
      <action-button actionName="Condividi" icon="fas fa-share-alt" />
    </div>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import ActionButton from "../../ui/ActionButton.vue";
import YesNoPopup from "../../ui/YesNoPopup.vue";
import { mapGetters } from "vuex";
import ListItem from '../../ui/ListItem.vue';
import UserLine from '../../users/UserLine.vue';

export default {
  components: { ActionButton, YesNoPopup, ListItem, UserLine },
  name: "ActionTab",
  props: {
    owner: Boolean,
    active: Boolean,
    subscribed: String,
    team: Boolean,
  },
  data() {
    return {
      title: "",
      text: "",
      owners: [],
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    canSubscribe() {
      return this.subscribed == "NONE" && !this.active;
    },
    canRetire() {
      return ["SUBSCRIBED", "REQUESTED"].includes(this.subscribed);
    },
  },
  methods: {
    //OWNER ACTIONS
    nameAdmin() {
      this.$router.push({ name: "NameAdmin" });
    },
    manageSubscriptions() {
      this.$router.push({ name: "ManageSubscriptions" });
    },
    async startTournament() {
      let res = await this.$refs["yes-no"].show(
        "Avvia il torneo",
        "Sei sicuro di voler avviare il torneo?"
      );
      if (res) {
        dataAccess.matches.startRound(this.$route.params.id)
      }
      this.$router.go(0)
    },
    async deleteTournament() {
      let res = await this.$refs["yes-no"].show(
        "Elimina il torneo",
        "Questa azione eliminerà il torneo"
      );
      if (res) {
        await dataAccess.tournaments.delete(this.$route.params.id);
        this.$router.push({ name: "MyTournaments" });
      }
    },
    addParticipant() {
      this.$router.push({ name: "AddParticipant" });
    },
    async showOwnerContacts() {
      let ids = await dataAccess.tournamentOwners.getAll(this.$route.params.id)
      this.owners = await dataAccess.users.search({userIds: JSON.stringify(ids)})
      this.$refs["ownersModal"].show()
    },
    //USER ACTIONS
    async requestSubscription() {
      if (this.team) {
        //TODO team subscription flow
      } else {
        let res = await this.$refs["yes-no"].show(
          "Iscriviti al torneo",
          "Vuoi chiedere di iscriverti al torneo?"
        );
        if (res) {
          let request = {
            type: "USER",
            userId: this.userId,
          };
          await dataAccess.participationRequests.add(
            this.$route.params.id,
            request
          );
          this.$router.go(0); //refresh
        }
      }
    },
    async retireFromTournament() {
      let res = await this.$refs["yes-no"].show(
        "Ritirati dal torneo",
        "Vuoi ritirarti la tua iscrizione al torneo?"
      );
      if (res) {
        let participation = await dataAccess.participationRequests.getAll({
          tournamentId: this.$route.params.id,
          userId: this.userId,
        });
        if (participation.length > 0) {
          if (this.subscribed == "SUBSCRIBED") {
            await dataAccess.participants.delete(
              this.$route.params.id,
              participation[0].id
            );
          } else if (this.subscribed == "REQUESTED") {
            await dataAccess.participationRequests.delete(
              this.$route.params.id,
              participation[0].id
            );
          }
        }
        this.$router.go(0); //refresh
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ownerRow{
  display:flex;
  align-items:baseline;
  .user{
    flex-grow:2;
  }
  .button{
    flex-grow:1;
    text-align: center;
    height:100%;
    color: $color-secondary2;
  }
}

a{
  text-decoration: none;
  &:hover{
    text-decoration:none;
  }
}
</style>