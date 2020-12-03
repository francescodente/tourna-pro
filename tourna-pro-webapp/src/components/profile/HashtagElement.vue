<template>
  <div class="hashtag">
    {{'#'+element}}
  </div>
</template>

<script>
export default {
  props :{
    element: String
  }
}
</script>

<style lang="scss" scoped>
.hashtag{
  background-color: gray;
  color: white;
  border-radius: 50px;
}
</style>