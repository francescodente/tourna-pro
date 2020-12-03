<template>
  <div class="divisore">
    {{text}}
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
.divisore{
  border-bottom: 2px solid;
  background-color: white;
}

</style>