<template>
  <div class="activity-card">
    <div class="activity-name">
      {{ name }}
    </div>

    <div class="activity-toggle">
      <toggle-button
        :value="value"
        :labels="false"
        @input="$emit('input', $event)"
        color="#21eda5"
      /> <!-- TODO: remove hard-coded color-->
    </div>
  </div>
</template>

<script>

import { ToggleButton } from 'vue-js-toggle-button'
export default {
  components: { ToggleButton },
  props: {
    value: Boolean,
    name: String
  }
}
</script>

<style lang="scss" scoped>
.activity-card {
  border: 1px solid #aaaaaa;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>