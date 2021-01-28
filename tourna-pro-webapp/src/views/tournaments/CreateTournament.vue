<template>
  <div class="create-tournament">
    <h2>Inserisci le informazioni per il torneo</h2>
    <simple-form
      class="form-style"
      submitMessage="Crea"
      @submit="createTournament"
      :canSubmit="formValid"
    >
      <simple-validator
        v-model="nameok"
        errorText="Il nome non può essere vuoto"
        :validator="(x) => notEmpty(x)"
        v-slot="scope"
      >
        <simple-input
          label="Nome"
          type="text"
          v-model="name"
          identifier="name"
          :scope="scope"
        />
      </simple-validator>

      <simple-text-area label="Descrizione" v-model="description" /> <!-- !!!!!! -->
     
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
      /> <!-- !!!!!! che non sia minore di 1 --> 

      <simple-dropdown
        label="Categoria"
        :options="genders"
        v-model="gender"
        identifier="gender"
      />

      <simple-validator
        v-model="luogook"
        errorText="Il luogo non può essere vuoto"
        :validator="(x) => notEmpty(x)"
        v-slot="scope"
      >
        <simple-input
          label="Luogo"
          type="text"
          v-model="place"
          identifier="place"
          :scope="scope"
        />
      </simple-validator>

      <simple-validator
        v-model="dataok"
        errorText="La data non può essere vuota"
        :validator="(x) => notEmpty(x)"
        v-slot="scope"
      >
        <simple-input
          label="Data"
          type="date"
          v-model="date"
          identifier="date"
          :scope="scope"
        />
      </simple-validator>
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
import SimpleValidator from "../../components/ui/SimpleValidator.vue";
import Validators from '@/utils/validator-func.js'
export default {
  components: {
    SimpleForm,
    SimpleInput,
    SimpleDropdown,
    SimpleRadioGroup,
    SimpleTextArea,
    SimpleNumber,
    SimpleValidator,
  },
  name: "CreateTournament",
  data: function () {
    return {
      name: "",
      description: "",
      mode: "TEAMS",
      type: "ROUND_ROBIN",
      maxParticipants: "8",
      activity: "SOCCER",
      gender: "M",
      place: "",
      date: "",
      genders: [
        {
          value: "M",
          display: "Maschile",
        },
        {
          value: "F",
          display: "Femminile",
        },
        {
          value: "NONE",
          display: "Misto",
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
      nameok: false,
      dataok: false,
      luogook: false,
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
    formValid() {
      return this.nameok && this.luogook && this.dataok; 
    },
  },
  methods: {
    ...Validators,
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
        maxAge: 100,
        minAge: 0,
        gender: this.gender,
        visibility: "PUBLIC",
      };
      let res = await dataAccess.tournaments.create(tournament);
      this.$router.push({ name: "TournamentDetails", params: { id: res.id } });
    },
  },
};
</script>


<style lang="scss" scoped>
.create-tournament {
  padding: 20px;
}
</style>