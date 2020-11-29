<template>
  <div class="simple-border">
    <div class="box">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

$spacing: 15px;

.simple-border {
  padding: $spacing;
  height: 100%;
  width: 100%;

  .box {
    height: 100%;
    width: 100%;
    padding: $spacing;
    border: 5px solid $color-primary-lightest;
    border-radius: 25px;
  }
}
</style>