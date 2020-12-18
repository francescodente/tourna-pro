<template>
  <div class="divisore" :style="{color: color}">
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
.divisore{
  border-bottom: 2px solid;
}

</style>