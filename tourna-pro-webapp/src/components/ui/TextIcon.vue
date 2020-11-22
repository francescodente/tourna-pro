<template>
  <div>
    <i :class="icon"></i>
    <span class="text">{{text}}</span>
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
.text{
  margin-left: 5px;
}
</style>