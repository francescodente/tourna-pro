<template>
  <div class="placeholder">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.2rem;
  color: #dddddd;
}
</style>