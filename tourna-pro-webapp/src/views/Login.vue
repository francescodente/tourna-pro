<template>
  <div>
    <simple-border>
      <simple-form submitMessage="Login" @submit="onSubmit" :canSubmit="formValid">
        <simple-validator
          v-model="usernameok"
          errorText="Lo username non può essere vuoto"
          :validator="x => notEmpty(x)"
          v-slot="scope"
        >
          <simple-input
            label="Username o Email"
            type="text"
            v-model="username"
            identifier="username"
            :scope="scope"
          />
        </simple-validator>

        <simple-validator
          v-model="passwordok"
          errorText="La password non può essere vuota"
          :validator="x => notEmpty(x)"
          v-slot="scope"
        >
          <simple-input
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            identifier="password"
            :scope="scope"
          />
        </simple-validator>

        <simple-checkbox
          label="Mostra password"
          v-model="showPassword"
          identifier="showpassword"
        />
      </simple-form>
    </simple-border>
    <span>
      Non hai un account?
      <router-link :to="{ name: 'Register' }">
        Registrati
      </router-link>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SimpleBorder from "../components/ui/SimpleBorder.vue";
import SimpleCheckbox from "../components/ui/SimpleCheckbox.vue";
import SimpleForm from "../components/ui/SimpleForm.vue";
import SimpleInput from "../components/ui/SimpleInput.vue";
import SimpleValidator from "../components/ui/SimpleValidator.vue";
import dataAccess from "../data-access";
import Validators from '@/utils/validator-func.js'
export default {
  components: {
    SimpleForm,
    SimpleInput,
    SimpleCheckbox,
    SimpleBorder,
    SimpleValidator,
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      usernameok: false,
      passwordok: false,
      
    };
  },
  methods: {
    ...mapActions(['initUnreadNotifications']),
    ...Validators,
    onSubmit: async function () {
      if(!this.formValid){
        return
      }
      try {
        var res = await dataAccess.authentication.login(
          this.username,
          this.password
        )
        localStorage.setItem("userId", res.userId)
        localStorage.setItem("accessToken", res.accessToken)
        this.$store.dispatch("initStore")
        this.initUnreadNotifications(res.userId)
        this.$socket.emit('authenticate', { accessToken: res.accessToken })
        this.$router.push({ name: "MyTournaments" })
      } catch (error) {}
    },
  },
  computed: {
    formValid() {
      return this.usernameok && this.passwordok;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>