<template>
  <div>
    <simple-form submitMessage="Cambia Password" @submit="onSubmit">
      <simple-input
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        identifier="password"
      />

      <simple-input
        label="Nuova Password"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        identifier="newpassword"
      />

      <simple-input
        label="Conferma Password"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        identifier="confirmpassword"
      />
    </simple-form>
  </div>
</template>

<script>
import SimpleForm from "../../components/ui/SimpleForm.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
export default {
  components: { SimpleForm, SimpleInput },
};
</script>

<style lang="scss" scoped>

</style>