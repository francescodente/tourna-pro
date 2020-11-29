<template>
  <div class="registration-page">
    <div>
      <h1>Step {{ currentStepIndex + 1 }}/{{ steps.length }}</h1>
      <h2>{{ currentStep.title }}</h2>
    </div>
    <simple-border class="registration-form">
      <simple-form :submitMessage="submitMessage" @submit="onSubmit">
        <component :is="currentStep.component" v-model="currentStep.model" />
      </simple-form>
    </simple-border>
  </div>
</template>

<script>
import SimpleForm from "../components/ui/SimpleForm.vue"
import AuthInfo from "../components/registration/AuthInfo.vue"
import UserInfo from "../components/registration/UserInfo.vue"
import ActivityInfo from "../components/registration/ActivityInfo.vue"
import SimpleBorder from '../components/ui/SimpleBorder.vue'

export default {
  components: { SimpleForm, AuthInfo, UserInfo, ActivityInfo, SimpleBorder },
  data() {
    return {
      currentStepIndex: 0,
      steps: [
        {
          title: 'Scegli una password sicura',
          component: AuthInfo,
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
          component: UserInfo,
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
          component: ActivityInfo,
          model: []
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      //console.log(this.currentStep.model)
      this.currentStepIndex++
    }
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