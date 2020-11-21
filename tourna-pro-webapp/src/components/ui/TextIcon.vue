<template>
  <div>
    <img class="icon" :src="icon.src" :alt="icon.alt" :style="`fill: ${icon.color}`"/>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'TextIcon',
  props: {
    text: String,
    icon: Object
  }
}
</script>

<style lang="scss" scoped>
.icon {
  max-width: 5%;
}
</style>