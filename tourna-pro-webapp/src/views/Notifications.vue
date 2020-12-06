<template>
  <div>
    <div v-for="n in notifications" :class="styleClass(n.seen)" :key="n.id">
      <date-text :date="n.date" :dateColor="style.colorPrimary">
        {{n.text}}
      </date-text>
    </div>
  </div>
</template>

<script>
import DateText from '../components/ui/DateText.vue'
import style from '../style/export.scss'
export default {
  components: { DateText },
  name: 'Notifications',
  data: function() {
    return {
      style,
      notifications: [
        {
          id: 1,
          date: "20/01/2020",
          text: "La squadra Magici ha vinto il torneo",
          seen: false
        },
        {
          id: 2,
          date: "18/01/2020",
          text: "La squadra Magici si è iscritta al torneo",
          seen: true
        }
      ]
    }
  },
  methods: {
    styleClass: function(seen) {
      return seen ? 'notification' : 'notification not-seen'
    }
  }
}
</script>

<style lang="scss">
.notification{
  padding: 10px;
  border-bottom: 1.5px solid $color-primary;
}
.not-seen{
  background-color: $color-primary-background;
}
</style>