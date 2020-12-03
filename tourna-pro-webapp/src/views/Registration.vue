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
    onSubmit() {
      this.currentStepIndex++
      this.$router.push({ name: this.currentStep.route })
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