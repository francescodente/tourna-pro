<template>
  <simple-form submitMessage="Cambia Password" @submit="onSubmit" class="form">
    <simple-input
      label="Password Attuale"
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      identifier="password"
    />

    <simple-input
      label="Nuova Password"
      :type="showPassword ? 'text' : 'password'"
      v-model="newPassword"
      identifier="newpassword"
    />

    <simple-input
      label="Conferma Password"
      :type="showPassword ? 'text' : 'password'"
      v-model="confirmPassword"
      identifier="confirmpassword"
    />

    <simple-checkbox
      label="Mostra password"
      v-model="showPassword"
      identifier="showpassword"
    />
  </simple-form>
</template>

<script>
import SimpleCheckbox from "../../components/ui/SimpleCheckbox.vue";
import SimpleForm from "../../components/ui/SimpleForm.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";

export default {
  components: { SimpleForm, SimpleInput, SimpleCheckbox },
  data() {
    return {
      username: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
    };
  },
  methods: {
    async onSubmit() {
      // TODO: add checks for new/confirm password equality
      await dataAccess.authentication.changePassword(
        this.$route.params.id,
        this.password,
        this.newPassword
      );
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