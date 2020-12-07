<template>
  <div class="main">
    <h1>Modifica i tuoi interessi:</h1>
    <activity-info v-model="selectedActivities" />
  </div>
</template>

<script>
import ActivityInfo from "../../components/registration/ActivityInfo.vue";

export default {
  components: { ActivityInfo },
  data() {
    return {
      selectedActivities: [],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>