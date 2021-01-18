<template>
  <div :class="['overlay-container', hoverable ? 'hoverable' : '']">
    <div class="info-bar">
      <span class="title">{{ title }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    hoverable: Boolean
  }
}
</script>

<style lang="scss" scoped>
.overlay-container {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0px;

  &.hoverable:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .info-bar {
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 30%;
    padding: 10px 15px;
    font-size: 1.3rem;
    background: rgba(85, 85, 85, 0.8);

    .title {
      font-weight: bold;
    }
  }
}
</style>