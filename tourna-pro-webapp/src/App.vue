<template>
  <div id="app">
    <title-bar :appName="name" />
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TitleBar from './components/ui/TitleBar.vue'

export default {
  components: {
    TitleBar
  },
  data: function() {
    return {
      name: 'TournaPro',
    }
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
    padding-top: 80px;
    height: 100vh;
  }
}
</style>
