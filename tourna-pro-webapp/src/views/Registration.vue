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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SimpleForm from "../components/ui/SimpleForm.vue"
import SimpleBorder from "../components/ui/SimpleBorder.vue"

export default {
  components: { SimpleForm, SimpleBorder },
  data() {
    return {
      currentStepIndex: 0,
      steps: [
        {
          title: 'Scegli una password sicura',
          route: 'AuthInfo',
          model: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            acceptsConditions: false
          }
        },
        {
          title: 'Dicci qualcosa di te',
          route: 'UserInfo',
          model: {
            firstName: '',
            lastName: '',
            telephone: '',
            city: '',
            gender: 'M'
          }
        },
        {
          title: 'A cosa ti piace giocare?',
          route: 'ActivityInfo',
          model: []
        }
      ]
    }
  },
  methods: {
    async onSubmit() {
      this.currentStepIndex++
      if(this.currentStep-1==3){return this.userRegistration}
      this.$router.push({ name: this.currentStep.route })
    },
    async userRegistration() {
      //TODO complete checks
      let user = {
        email: this.steps(0).model.email,
        username: this.steps(0).model.this.username,
        password: this.steps(0).model.this.password,
        confirmPassword: this.steps(0).model.this.confirmPassword,
        acceptsConditions: this.steps(0).model.acceptsConditions,
        firstName: this.steps(1).model.this.firstName,
        lastName: this.steps(1).model.this.lastName,
        telephone: this.steps(1).model.this.telephone,
        city: this.steps(1).model.this.city,
        gender: this.steps(1).model.this.gender,
        model: this.steps(2).model.this.model
      };
      let res = await dataAccess.users.register(user)
      this.$router.push({name: 'UserProfile', params: {id: res.id}})
    }
  },
  mounted() {
    this.currentStepIndex = this.steps.map(x => x.route).indexOf(this.$route.name)
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex]
    },
    submitMessage() {
      return this.currentStepIndex != this.steps.length - 1 ? 'Prossimo' : 'Completa'
    }
  }
}
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
}
</style>