<template>
  <div id="app">
    <error-popup/>
    <title-bar :appName="name" />
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorPopup from './components/ui/ErrorPopup.vue'
import TitleBar from './components/ui/TitleBar.vue'

export default {
  components: {
    TitleBar,
    ErrorPopup
  },
  data: function() {
    return {
      name: 'TournaPro',
    }
  },
  methods: {
    ...mapActions(['newNotification','initUnreadNotifications'])
  },
  created() {
    this.$socket.on('login', () => {
      console.log('Authenticating with socket.io...')
      this.initUnreadNotifications(this.$store.getters.userId)
      let accessToken = this.$store.getters.accessToken
      if (accessToken) {
        this.$socket.emit('authenticate', { accessToken })
      }
    })
    
    this.$socket.on('notification', notification => {
      console.log(notification)
      this.newNotification()
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .main-container {
    padding-top: $titlebar-height;
    height: 100vh;
    overflow: auto;
  }
}
</style>
