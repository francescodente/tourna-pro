<template>
  <div id="app">
    <error-popup/>
    <title-bar :appName="name" />
    <div :class="['main-container', isLoggedIn ? 'logged-in' : '']">
      <div class="background"></div>
      <div class="main-content">
        <div class="content-background"></div>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;


  .main-container {
    padding-top: $titlebar-height;
    height: 100vh;

    &.logged-in {
      padding-bottom: $bottom-navbar-height;
    }
    
    .background {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -2;
      background-color: $color-secondary1-background;
    }

    .main-content {
      height: 100%;
      width: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .content-background, .main-content-scrollable {
        width: 100%;
      }

      @media screen and (min-width: 576px) and (max-width: 768px) {
        .content-background, .main-content-scrollable {
          width: 550px;
        }
      }
      @media screen and (min-width: 768px) and (max-width: 992px) {
        .content-background, .main-content-scrollable {
          width: 750px;
        }
      }
      @media screen and (min-width: 992px) {
        .content-background, .main-content-scrollable {
          width: 950px;
        }
      }

      .content-background {
        position: fixed;
        height: 100%;
        background-color: white;
        box-shadow: 0px 0px 7px 7px #00000011;
        z-index: -1;
      }

      .main-content-scrollable {
        height: 100%;
      }
    }
  }
}
</style>
