<template>
  <div>
    <div v-for="a in activities" class="activity" :key="a.id">
      <date-text :date="a.date" :dateColor="style.colorSecondary2">
        {{a.text}}
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
  data: function() {
    return {
      style,
      activities: [
        {
          id: 1,
          date: '10/11/2020',
          text: 'La tua squadra si è iscritta al torneo',
        },
        {
          id: 2,
          date: '12/11/2020',
          text: 'La tua squadra si è ritirata dal torneo',
        }
      ]
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