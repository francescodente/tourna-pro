<template>
  <div>
    <simple-input
      label="Nome"
      type="text"
      v-model="currentValue.firstName"
      identifier="firstname"
      @input="$emit('input', currentValue)"
    />

    <simple-input
      label="Cognome"
      type="text"
      v-model="currentValue.lastName"
      identifier="lastname"
      @input="$emit('input', currentValue)"
    />

    <simple-input
      label="Data di nascita"
      type="date"
      v-model="currentValue.birthDate"
      identifier="birthdate"
      @input="$emit('input', currentValue)"
    />

    <simple-input
      label="Telefono"
      type="tel"
      v-model="currentValue.telephone"
      identifier="telephone"
      @input="$emit('input', currentValue)"
    />

    <simple-input
      label="Città"
      type="text"
      v-model="currentValue.city"
      identifier="city"
      @input="$emit('input', currentValue)"
    />

    <simple-dropdown
      label="Genere"
      :options="genders"
      v-model="currentValue.gender"
      identifier="gender"
      @input="$emit('input', currentValue)"
    />
  </div>
</template>

<script>
import Validators from "@/utils/validator-func.js";
import SimpleDropdown from "../ui/SimpleDropdown.vue";
import SimpleInput from "../ui/SimpleInput.vue";
export default {
  components: { SimpleInput, SimpleDropdown },
  props: {
    value: Object,
  },
  data() {
    return {
      currentValue: { ...this.value },
      genders: [
        {
          value: "M",
          display: "M",
        },
        {
          value: "F",
          display: "F",
        },
        {
          value: "NONE",
          display: "Preferisco non specificare",
        },
      ],
      firstNameOk: false,
      lastNameOk: false,
      birthDateOk: false,
      telephoneOk: false,
      cityOk: false,
    };
  },
  methods: {
    ...Validators,
  },
  computed: {
    isFilled() {
      return (
        this.firstNameOk &&
        this.lastNameOk &&
        this.birthDateOk &&
        this.telephoneOk &&
        this.cityOk
      );
    },
  },
  watch: {
    isFilled: function (value) {
      console.log(value);
      this.$emit("filled", value);
    },
  },
};
</script>

<style>
</style>