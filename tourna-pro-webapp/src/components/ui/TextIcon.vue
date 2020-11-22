<template>
  <div>
    <i :class="icon"></i>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'TextIcon',
  props: {
    text: String,
    icon: String,
  }
}
</script>

<style lang="scss" scoped>

</style>