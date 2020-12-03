<template>
  <div class="bio">
    <simple-input
      label="Su di me:"
      type="text"
      v-model="currentValue"
      identifier="bio"
      @input="$emit('input', currentValue)"
    />
  </div>
</template>

<script>
import SimpleInput from "../ui/SimpleInput.vue";
export default {
  components: { SimpleInput },
  data: function () {
    return {
      currentValue: { ...this.value },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>