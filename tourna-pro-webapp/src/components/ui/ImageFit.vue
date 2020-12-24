<template>
  <div class="image-container">
    <img :src="src" :alt="alt">
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    alt: String
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  height: 100%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
}
</style>