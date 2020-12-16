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
        :color="style.colorComplementaryLight"
      />
    </div>
  </div>
</template>

<script>

import { ToggleButton } from 'vue-js-toggle-button'
import style from '../../style/export.scss'
export default {
  components: { ToggleButton },
  props: {
    value: Boolean,
    name: String
  },
  data: function(){
    return{
      style
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-card {
  border: 2px solid $color-not-focus-text;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>