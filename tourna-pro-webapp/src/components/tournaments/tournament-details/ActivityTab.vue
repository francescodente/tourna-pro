<template>
  <div>
    <div v-for="l in logs" class="activity" :key="l.id">
      <date-text :date="l.date" :dateColor="style.colorSecondary2">
        {{l.text}}
      </date-text>
    </div>
  </div>
</template>
<script>

import DateText from '../../../components/ui/DateText.vue'
import style from '../../../style/export.scss'
export default {
  components: {DateText},
  name: 'ActivityTab',
  props:
  {
    logs: Array
  },
  data: function() {
    return {
      style
    }
  }
}
</script>

<style lang="scss" scoped>
.activity{
  color: black;
  padding: 12px;
  margin: 10px;
  background-color: $color-secondary2-background;
  border-radius: 15px;
}
</style>