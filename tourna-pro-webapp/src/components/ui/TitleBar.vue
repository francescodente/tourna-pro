<template>
  <div class="title-bar">
    <div class="back-button" @click="back">
      <i class="fas fa-chevron-left"></i>
    </div>
    {{ appName }}
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    appName: String
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
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

  .back-button {
    position: absolute;
    left: 0px;
    height: 100%;
    width: $titlebar-height * 0.7;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: $color-primary-darker;
      cursor: pointer;
    }
  }
}
</style>