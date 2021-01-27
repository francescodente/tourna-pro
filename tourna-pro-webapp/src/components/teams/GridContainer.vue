<template>
  <div class="parent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.parent{
  display: flex;
  flex-wrap: wrap;
  flex-basis: auto;
  justify-content: space-between;
}
.parent > * {
  flex: 0 0 49%;
  margin: 1px;
}
</style>