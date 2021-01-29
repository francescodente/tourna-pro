<template>
  <div class="activity-container">
    <div v-for="l in logs" class="activity" :key="l.id">
      <date-text :date="l.date" :dateColor="style.colorSecondary2">
        {{ l | formatTournamentLog }}
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
  props: {
    logs: Array
  },
  data() {
    return {
      style
    }
  }
}
</script>

<style lang="scss" scoped>

.activity-container {
  padding: 20px;
}
.activity{
  color: $color-default-text;
  padding: 12px;
  margin-bottom: 20px;
  background-color: $color-secondary2-background;
  border-radius: 15px;
}
</style>