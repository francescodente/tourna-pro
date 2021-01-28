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
  flex: 0 0 100%;
  margin-bottom: 25px;
}

@media screen and (min-width: 768px) {
  .parent > * {
    flex: 0 0 49%;
  }
}
</style>