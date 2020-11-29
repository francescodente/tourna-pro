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
    </simple-form>
  </simple-border>
</template>

<script>
import SimpleBorder from '../components/ui/SimpleBorder.vue'
import SimpleCheckbox from '../components/ui/SimpleCheckbox.vue'
import SimpleForm from '../components/ui/SimpleForm.vue'
import SimpleInput from '../components/ui/SimpleInput.vue'
export default {
  components: { SimpleForm, SimpleInput, SimpleCheckbox, SimpleBorder },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    onSubmit() {
      console.log(`${this.username} ${this.password}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>