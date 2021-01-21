<template>
  <div>
    <div v-for="n in notifications" :class="styleClass(n.read)" :key="n.id" @click="openNotification(n)">
      <date-text :date="n.date" :dateColor="style.colorPrimary">
        {{ n | formatNotification }}
      </date-text>
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import { mapActions, mapGetters } from 'vuex'
import DateText from '../components/ui/DateText.vue'
import style from '../style/export.scss'
export default {
  components: { DateText },
  name: 'Notifications',
  data() {
    return {
      style,
      notifications: []
    }
  },
  methods: {
    ...mapActions(['readNotification']),
    openNotification(notification) {
      notification.read = true
      this.readNotification()
      dataAccess.logs.markAsRead(this.$store.getters.userId, notification.id)
    },
    styleClass(read) {
      return {
        'notification': true,
        'not-read': !read
      }
    }
  },
  async created() {
    this.notifications = await dataAccess.logs.getUserNotifications(this.$store.getters.userId)
  }
}
</script>

<style lang="scss">
.notification {
  padding: 10px;
  border-bottom: 1.5px solid $color-primary;

  &:hover {
    cursor: pointer;
  }
}
.not-read {
  background-color: $color-primary-background;
}
</style>