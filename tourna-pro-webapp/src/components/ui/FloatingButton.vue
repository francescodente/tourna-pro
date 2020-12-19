<template>
  <button @click="$emit('click', $event)">
    <slot><i :class="icon" /></slot>
  </button>  
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style lang="scss" scoped>
$distance: 25px;
$size: 70px;

button {
  position: fixed;
  right: $distance;
  bottom: $distance + $bottom-navbar-height;
  height: $size;
  width: $size;
  border: none;
  border-radius: 100%;
  background-color: $color-complementary;
  color: white;
  font-size: 1.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border:4px solid $color-complementary-light;
}
</style>