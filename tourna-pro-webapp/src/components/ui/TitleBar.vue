<template>
  <div class="title-bar">
    <div>{{ appName }}</div>
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
  font-size: 2rem;
  font-weight: bold;
  position: fixed;
  width: 100%;
  height: $titlebar-height;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>