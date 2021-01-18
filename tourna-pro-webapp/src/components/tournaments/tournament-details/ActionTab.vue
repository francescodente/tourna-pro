<template>
  <div class="main">
    <yes-no-popup ref="modal"/>
    <div class="owner-actions" v-if="owner">
      <action-button actionName="Nomina amministratore" icon="fas fa-crown" @trigger="nameAdmin" />
      <div class="active-tournament" v-if="active">
        <action-button actionName="Inserisci risultati" icon="fas fa-clipboard-list" />
      </div>
      <div class="inactive-tournament" v-if="!active">
        <action-button actionName="Aggiungi partecipante non registrato" icon="fas fa-user-plus" />
        <action-button actionName="Gestisci iscrizioni" icon="fas fa-check-square" @trigger="manageSubscriptions" />
        <action-button actionName="Avvia il torneo" icon="fas fa-flag" @trigger="startTournament" />
        <action-button actionName="Modifica il torneo" icon="far fa-edit" />
        <action-button actionName="Elimina il torneo" icon="far fa-trash-alt" />
      </div>
        
    </div>
    <div class="user-actions" v-if="!owner">
      <div class="unsubscribed-actions" v-if="!subscribed && !active">
        <action-button actionName="Iscriviti al torneo" icon="far fa-check-square" />
      </div>
      <div class="subscribed-actions" v-if="subscribed">
        <action-button actionName="Ritirati dal torneo" icon="fas fa-times" />
        <div class="active-tournament" v-if="active">
        <action-button actionName="Visualizza partite" icon="fas fa-clipboard-list" />
        </div>
      </div>
      <action-button actionName="Contatta l'organizzatore" icon="fas fa-phone-alt" />
    </div>
        <div class="base-actions">
      <action-button actionName="Condividi" icon="fas fa-share-alt" />
    </div>
  </div>
</template>

<script>
import ActionButton from "../../ui/ActionButton.vue";
import YesNoPopup from '../../ui/YesNoPopup.vue';

export default {
  components: { ActionButton, YesNoPopup },
  name: "ActionTab",
  props: {
    owner: Boolean,
    active: Boolean,
    subscribed: Boolean
  },
  data(){
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    nameAdmin() {
      this.$router.push({name: 'NameAdmin'})
    },
    manageSubscriptions() {
      this.$router.push({name: 'ManageSubscriptions'})
    },
    async startTournament(){
      let res = await this.$refs["modal"].show("Avvia il torneo", "Sei sicuro di voler avviare il torneo?")
      console.log(res)
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 10px;
  height: 100%;
  display:flex;
  flex-direction: column;
}


</style>