<template>
  <div class="registration-page">
    <div>
      <h1>Step {{ currentStepIndex + 1 }}/{{ steps.length }}</h1>
      <h2>{{ currentStep.title }}</h2>
    </div>
    <simple-border class="registration-form">
      <simple-form :submitMessage="submitMessage" @submit="onSubmit">
        <router-view v-model="currentStep.model" />
      </simple-form>
    </simple-border>
    <span class="suggestion">
      Hai già un account?
      <router-link :to="{ name: 'Login' }">Accedi</router-link>
    </span>
  </div>
</template>

<script>
import SimpleForm from "../components/ui/SimpleForm.vue";
import SimpleBorder from "../components/ui/SimpleBorder.vue";
import dataAccess from "@/data-access"

export default {
  components: { SimpleForm, SimpleBorder },
  data() {
    return {
      steps: [
        {
          title: "Scegli una password sicura",
          route: "AuthInfo",
          filled: false,
          model: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            acceptsConditions: false,
          },
        },
        {
          title: "Dicci qualcosa di te",
          route: "UserInfo",
          filled: false,
          model: {
            firstName: "",
            lastName: "",
            telephone: "",
            birthDate: "",
            city: "",
            gender: "M",
          },
        },
        {
          title: "A cosa ti piace giocare?",
          route: "ActivityInfo",
          filled: false,
          model: [],
        },
      ],
    };
  },
  methods: {
    async onSubmit() {
      this.currentStep.filled = true
      if (this.currentStepIndex >= this.steps.length-1) {
        await this.userRegistration();
      } else {
        let next = this.currentStepIndex + 1
        this.$router.push({ name: this.steps[next].route });
      }
    },
    async userRegistration() {
      //TODO complete checks
      if (this.steps[0].model.password != this.steps[0].model.confirmPassword) {
        return;
      }
      let user = {
        firstName: this.steps[1].model.firstName,
        lastName: this.steps[1].model.lastName,
        username: this.steps[0].model.username,
        birthDate: this.steps[1].model.birthDate,
        email: this.steps[0].model.email,
        telephone: this.steps[1].model.telephone,
        gender: this.steps[1].model.gender,
        city: this.steps[1].model.city,
        password: this.steps[0].model.password,
        interests: this.steps[2].model
      };
      await dataAccess.users.register(user);
      this.$router.push({name: "Login"});
    },
  },
  computed: {
    currentStepIndex() {
      return this.steps
        .map(x => x.route)
        .indexOf(this.$route.name)
    },
    currentStep() {
      return this.steps[this.currentStepIndex];
    },
    submitMessage() {
      return this.currentStepIndex != this.steps.length - 1
        ? "Prossimo"
        : "Completa";
    },
  },
  mounted() {
    let firstNotFilled = this.steps.findIndex(x => !x.filled)
    if (firstNotFilled && firstNotFilled < this.currentStepIndex) {
      this.$router.replace({ name: this.steps[firstNotFilled].route })
    }
  }
};
</script>

<style lang="scss" scoped>
.registration-page {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;

  .registration-form {
    flex: 1;
  }

  .suggestion {
    padding-bottom: 20px;
  }
}
</style>