<template>
  <div>
    <simple-validator
      v-model="emailOk"
      errorText="Email non valida"
      :validator="(x) => notEmpty(x) && checkMail(x)"
      v-slot="scope"
    >
      <simple-input
        label="Email"
        type="email"
        v-model="currentValue.email"
        identifier="email"
        :scope="scope"
        @input="$emit('input', currentValue)"
      />
    </simple-validator>

    <simple-validator
      v-model="usernameOk"
      errorText="Lo username non può essere vuoto"
      :validator="(x) => notEmpty(x)"
      v-slot="scope"
    >
      <simple-input
        label="Username"
        type="text"
        v-model="currentValue.username"
        identifier="username"
        @input="$emit('input', currentValue)"
        :scope="scope"
      />
    </simple-validator>

    <simple-validator
      v-model="passwordOk"
      errorText="La password non può essere minore di 8 caratteri"
      :validator="(x) => notEmpty(x) && checkLength(x, 8)"
      v-slot="scope"
    >
      <simple-input
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        v-model="currentValue.password"
        identifier="password"
        @input="$emit('input', currentValue)"
        :scope="scope"
      />
    </simple-validator>

    <simple-validator
      v-model="confirmOk"
      errorText="La password non può essere minore di 8 caratteri"
      :validator="(x) => notEmpty(x) && checkLength(x, 8)"
      v-slot="scope"
    >
      <simple-input
        label="Conferma password"
        :type="showPassword ? 'text' : 'password'"
        v-model="currentValue.confirmPassword"
        identifier="confirmpassword"
        @input="$emit('input', currentValue)"
        :scope="scope"
      />
    </simple-validator>

    <simple-checkbox
      label="Mostra password"
      v-model="showPassword"
      identifier="showpassword"
    />

    <simple-validator
      v-model="termsOk"
      errorText="I termini e le condizioni non sono stati accettati"
      :validator="(x) => checkBox(x)"
      v-slot="scope"
    >
      <simple-checkbox
        identifier="acceptsConditions"
        v-model="currentValue.acceptsConditions"
        @input="$emit('input', currentValue)"
        :scope="scope"
      >
        Dichiaro di accettare i
        <a href="#">termini e le condizioni del servizio</a>
      </simple-checkbox>
    </simple-validator>
  </div>
</template>

<script>
import Validators from "@/utils/validator-func.js";
import SimpleCheckbox from "../ui/SimpleCheckbox.vue";
import SimpleInput from "../ui/SimpleInput.vue";
import SimpleValidator from "../ui/SimpleValidator.vue";
export default {
  components: { SimpleInput, SimpleCheckbox, SimpleValidator },
  props: {
    value: Object,
  },
  data() {
    return {
      currentValue: { ...this.value },
      emailOk: false,
      usernameOk: false,
      passwordOk: false,
      confirmOk: false,
      showPassword: false,
      termsOk: false,
    };
  },
  methods: {
    ...Validators,
  },
  computed: {
    isFilled() {
      return (
        this.emailOk &&
        this.usernameOk &&
        this.passwordOk &&
        this.confirmOk &&
        this.termsOk &&
        (this.currentValue.password == this.currentValue.confirmPassword)
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