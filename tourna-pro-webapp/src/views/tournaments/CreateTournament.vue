<template>
  <div class="main">
    <simple-form submitMessage="Crea nuovo">
      <simple-input
        label="Nome"
        type="text"
        v-model="name"
        identifier="name"
      />
      <simple-radio-group
        label="Modalità"
        v-model="mode"
        :options="modes"
        group="mode"
        :inline="true"
      />
      <simple-dropdown
        label="Attività"
        :options="activities"
        v-model="activity"
        identifier="activity"
      />
      <simple-input
        label="Numero massimo di partecipanti"
        type="number"
        v-model="maxNumber"
        identifier="maxNumber"
      />
      <simple-input
        label="Età massima"
        type="number"
        v-model="maxAge"
        identifier="maxAge"
      />
      <simple-input
        label="Età minima"
        type="number"
        v-model="minAge"
        identifier="minAge"
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
      <simple-input
      label="Data"
      type="date"
      v-model="date"
      identifier="date"
      />
    </simple-form>
  </div>
</template>

<script>
import SimpleDropdown from "../../components/ui/SimpleDropdown.vue";
import SimpleForm from "../../components/ui/SimpleForm.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
import SimpleRadioGroup from '../../components/ui/SimpleRadioGroup.vue';
export default {
  components: { SimpleForm, SimpleInput, SimpleDropdown, SimpleRadioGroup },
  name: "CreateTournament",
  data: function () {
    return {
      name: "Nuovo Torneo",
      description: "",
      mode: "",
      maxNumber: 1,
      activity: "",
      maxAge: 0,
      minAge: 0,
      gender: "",
      place: "",
      date: "",
      activities: [
        {
          value: "calcetto",
          display: "calcetto",
        },
        {
          value: "pallavolo",
          display: "pallavolo",
        },
        {
          value: "basket",
          display: "basket",
        },
      ],
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
          value: "UNDEFINED",
          display: "Misti",
        },
      ],
      modes: [
        {
          value: "TEAMS",
          display: "Squadre",
        },
        {
          value: "SINGLE",
          display: "Singoli",
        },
      ]
    };
  },
};
</script>


<style lang="scss" scoped>
.main {
  height: 90%;
  width: 90%;
  margin-left: 5%;
  margin-top: 15px;
}
</style>