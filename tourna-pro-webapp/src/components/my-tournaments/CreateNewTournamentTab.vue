<template>
  <div>
      <action-button icon="fas fa-globe-europe" actionName="Torneo pubblico"/>
      <action-button icon="fas fa-lock" actionName="Torneo privato"/>
  </div>
</template>

<script>
import ActionButton from '../ui/ActionButton.vue'
export default {
  components: { ActionButton },
  name: 'CreateNewTournamentTab',
  props: {
    appName: String
  }
}
</script>

<style lang="scss" scoped>

</style>