<template>
  <div>
    <h1>Modifica password</h1>
    <simple-form
      submitMessage="Cambia Password"
      @submit="onSubmit"
      class="form"
      :canSubmit="formValid"
    >
      <simple-validator
        v-model="pwdok"
        errorText="La password non può essere vuota"
        :validator="(x) => notEmpty(x)"
        v-slot="scope"
      >
        <simple-input
          label="Password Attuale"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          identifier="password"
          :scope="scope"
        />
      </simple-validator>

      <simple-validator
        v-model="nuovapwdok"
        errorText="La nuova password non può essere minore di 8 caratteri"
        :validator="(x) => notEmpty(x) && checkLength(x,8)"
        v-slot="scope"
      >
        <simple-input
          label="Nuova Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="newPassword"
          identifier="newpassword"
          :scope="scope"
        />
      </simple-validator>

      <simple-validator
        v-model="confermapwdok"
        errorText="La password non può essere minore di 8 caratteri"
        :validator="(x) => notEmpty(x) && checkLength(x,8)"
        v-slot="scope"
      >
        <simple-input
          label="Conferma Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          identifier="confirmpassword"
          :scope="scope"
        />
      </simple-validator>

      <simple-checkbox
        label="Mostra password"
        v-model="showPassword"
        identifier="showpassword"
      />
    </simple-form>
  </div>
</template>

<script>
import SimpleCheckbox from "../../components/ui/SimpleCheckbox.vue";
import SimpleForm from "../../components/ui/SimpleForm.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
import SimpleValidator from "../../components/ui/SimpleValidator.vue";
import dataAccess from "@/data-access";
import Validators from "@/utils/validator-func.js";

export default {
  components: { SimpleForm, SimpleInput, SimpleCheckbox, SimpleValidator },
  data() {
    return {
      username: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      pwdok: false,
      nuovapwdok: false,
      confermapwdok: false,
    };
  },
  methods: {
    ...Validators,
    async onSubmit() {
      if(this.newPassword != this.confirmPassword){
        this.$store.dispatch('setError', "La nuova password non corrisponde a quella di conferma")
        return;
      }
      await dataAccess.authentication.changePassword(
        this.$route.params.id,
        this.password,
        this.newPassword
      );
    },
  },
  computed: {
    formValid() {
      return this.pwdok && this.nuovapwdok && this.confermapwdok;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 5%;
  height: 100%;
  width: 90%;
  margin-left: 5%;
}
</style>