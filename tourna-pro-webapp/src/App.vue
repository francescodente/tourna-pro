<template>
  <div id="app">
    <error-popup/>
    <title-bar :appName="name" />
    <div :class="['main-container', isLoggedIn ? 'logged-in' : '']">
      <div class="main-content">
        <div class="main-content-scrollable">
          <router-view/>
        </div>
      </div>
    </div>
    <bottom-navbar v-if="isLoggedIn" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BottomNavbar from './components/ui/BottomNavbar.vue'
import ErrorPopup from './components/ui/ErrorPopup.vue'
import TitleBar from './components/ui/TitleBar.vue'

export default {
  components: {
    TitleBar,
    ErrorPopup,
    BottomNavbar
  },
  data: function() {
    return {
      name: 'TournaPro',
    }
  },
  methods: {
    ...mapActions(['newNotification','initUnreadNotifications'])
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  created() {
    this.$socket.on('login', () => {
      let accessToken = this.$store.getters.accessToken
      if (accessToken) {
        console.log('Authenticating with socket.io...')
        this.initUnreadNotifications(this.$store.getters.userId)
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
    background-color: $color-secondary1-background;

    &.logged-in {
      padding-bottom: $bottom-navbar-height;
    }

    .main-content {
      height: 100%;
      width: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .main-content-scrollable {
        background-color: white;
        flex-grow: 1;
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 767.98px) {
    .main-container{
      .main-content{
        .main-content-scrollable{
          width: 80%;
        }
      }
    }
  }

  @media only screen and (min-width: 768px){
    .main-container{
      .main-content{
        .main-content-scrollable{
          display: block;
          width: 750px;
        }
      }
    }
  }
}
</style>
