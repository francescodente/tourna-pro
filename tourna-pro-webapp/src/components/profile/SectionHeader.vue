<template>
  <div class="header" :style="{color: color}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    text: String,
    color: String
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 2px solid;
  font-size: 1.3rem;
}

</style>