<template>
  <div class="main">
    <simple-form
      class="form-style"
      submitMessage="Crea"
      @submit="createTournament"
    >
      <simple-input label="Nome" type="text" v-model="name" identifier="name" />
      <simple-text-area label="Descrizione" v-model="description" />
      <simple-radio-group
        label="Modalità"
        v-model="mode"
        :options="modes"
        group="mode"
        :inline="true"
      />

      <simple-radio-group
        label="Tipologia"
        v-model="type"
        :options="displayTypes"
        group="type"
        :inline="true"
      />
      <simple-dropdown
        label="Attività"
        :options="displayActivities"
        v-model="activity"
        identifier="activity"
      />
      <simple-number
        label="Numero massimo di partecipanti"
        v-model="maxParticipants"
        identifier="maxNumber"
        min="1"
      />
      <simple-number
        label="Età massima"
        v-model="maxAge"
        identifier="maxAge"
        min="0"
      />
      <simple-number
        label="Età minima"
        v-model="minAge"
        identifier="minAge"
        min="0"
      />
      <simple-dropdown
        label="Partecipanti"
        :options="genders"
        v-model="gender"
        identifier="gender"
      />
      <simple-input
        label="Luogo"
        type="text"
        v-model="place"
        identifier="place"
      />
      <simple-input label="Data" type="date" v-model="date" identifier="date" />
    </simple-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dataAccess from "@/data-access";
import SimpleDropdown from "../../components/ui/SimpleDropdown.vue";
import SimpleForm from "../../components/ui/SimpleForm.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
import SimpleNumber from "../../components/ui/SimpleNumber.vue";
import SimpleRadioGroup from "../../components/ui/SimpleRadioGroup.vue";
import SimpleTextArea from "../../components/ui/SimpleTextArea.vue";
import tournamentTypes from "../../data-access/backend/tournament-types";
export default {
  components: {
    SimpleForm,
    SimpleInput,
    SimpleDropdown,
    SimpleRadioGroup,
    SimpleTextArea,
    SimpleNumber,
  },
  name: "CreateTournament",
  data: function () {
    return {
      name: "",
      description: "",
      mode: "",
      type: "",
      maxParticipants: "1",
      activity: "",
      maxAge: "0",
      minAge: "0",
      gender: "",
      place: "",
      date: "",
      genders: [
        {
          value: "M",
          display: "Uomini",
        },
        {
          value: "F",
          display: "Donne",
        },
        {
          value: "NONE",
          display: "Misti",
        },
      ],
      modes: [
        {
          value: "TEAMS",
          display: "A squadre",
        },
        {
          value: "INDIVIDUAL",
          display: "Individuale",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["activities", "tournamentTypes"]),
    displayActivities() {
      return this.activities.map((a) => ({ value: a.id, display: a.name }));
    },
    displayTypes() {
      return this.tournamentTypes.map((t) => ({
        value: t.id,
        display: t.name,
      }));
    },
  },
  methods: {
    async createTournament() {
      //TODO complete checks
      let tournament = {
        maxParticipants: this.maxParticipants,
        date: this.date,
        name: this.name,
        activityId: this.activity,
        type: this.type,
        location: this.place,
        description: this.description,
        mode: this.mode,
        maxAge: this.maxAge,
        minAge: this.minAge,
        gender: this.gender,
        visibility: "PUBLIC",
      };
      console.log(tournament);
      let res = await dataAccess.tournaments.create(tournament);
      this.$router.push({name: 'TournamentDetails', params: {id: res.id}})
    },
  },
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  width: 90%;
  margin-left: 5%;
}

.form-style {
  padding: 20px 0px;
}
</style>