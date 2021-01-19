<template>
  <div class="home">
    <div class="home-content">
      <router-view />
    </div>
    <bottom-navbar />
  </div>
</template>

<script>
import BottomNavbar from '../components/ui/BottomNavbar.vue'

export default {
  components: { BottomNavbar },
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  padding-bottom: $bottom-navbar-height;

  .home-content {
    height: 100%;
    overflow: auto;
  }
}
</style>
