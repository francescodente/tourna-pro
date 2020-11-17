<template>
  <div class="title-bar">
    {{ appName }}
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    appName: String
  }
}
</script>

<style lang="scss" scoped>
.title-bar {
  background-color: $color-primary;
  color: white;
  padding: 5%;
  font-size: 2rem;
  font-weight: bold;
  position: fixed;
  width: 100%;
}
</style>