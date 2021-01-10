<template>
  <simple-border>
    <simple-form submitMessage="Login" @submit="onSubmit">
      <simple-input
        label="Username o Email"
        type="text"
        v-model="username"
        identifier="username"
      />

      <simple-input
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        identifier="password"
      />

      <simple-checkbox
        label="Mostra password"
        v-model="showPassword"
        identifier="showpassword"
      />
      <span>Non hai un account? <router-link :to="{name: 'Register'}">Registrati</router-link></span>
    </simple-form>
  </simple-border>
</template>

<script>
import SimpleBorder from "../components/ui/SimpleBorder.vue";
import SimpleCheckbox from "../components/ui/SimpleCheckbox.vue";
import SimpleForm from "../components/ui/SimpleForm.vue";
import SimpleInput from "../components/ui/SimpleInput.vue";
import dataAccess from "../data-access";
export default {
  components: { SimpleForm, SimpleInput, SimpleCheckbox, SimpleBorder },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    onSubmit: async function () {
      try {
        var res = await dataAccess.authentication.login(
          this.username,
          this.password
        );
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("accessToken", res.data.accessToken);
        this.$store.dispatch("initStore");
        this.$router.push({name: 'MyTournaments'});
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
</style>