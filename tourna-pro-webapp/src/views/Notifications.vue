<template>
  <div>
    <div v-if="notifications && notifications.length > 0">
      <div v-for="n in notifications" :class="styleClass(n.read)" :key="n.id" @click="openNotification(n)">
        <date-text :date="n.date" :dateColor="style.colorPrimary">
          {{ n | formatNotification }}
        </date-text>
      </div>
    </div>
    <div v-else-if="notifications">
      <placeholder-text text="Ancora nessuna notifica" />
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import { mapActions } from 'vuex'
import DateText from '../components/ui/DateText.vue'
import style from '../style/export.scss'
import PlaceholderText from '../components/ui/PlaceholderText.vue'
export default {
  components: { DateText, PlaceholderText },
  name: 'Notifications',
  data() {
    return {
      style,
      notifications: null,
      listenerId: null
    }
  },
  methods: {
    ...mapActions(['readNotification']),
    openNotification(notification) {
      if (!notification.read) {
        notification.read = true
        this.readNotification()
        dataAccess.logs.markAsRead(this.$store.getters.userId, notification.id)
      }
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
    this.listenerId = this.$socket.on('notification', notification => {
      this.notifications.unshift(notification)
    })
  },
  destroyed() {
    this.$socket.off(this.listenerId)
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