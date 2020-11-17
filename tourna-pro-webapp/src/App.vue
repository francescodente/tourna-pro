<template>
  <div id="app">
    <!--TitleBar :appName="name"/-->
    <ActionButton actionName="This is an action" 
    :icon="{
      src: require('@/assets/logo.png'),
      alt: 'alt-text'
      }"
    />
    <router-view/>
  </div>
</template>

<script>
/*import TitleBar from '@/components/ui/TitleBar.vue'*/
import ActionButton from './components/ui/ActionButton.vue'

export default {
  components: {
    ActionButton
  },
  data: function() {
    return {
      name: 'TournaPro',
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
