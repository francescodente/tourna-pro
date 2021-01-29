<template>
  <div class="head-container">
    <h2><slot/></h2>
    <hr/>
  </div>
</template>

<script>
export default {
  name: 'Headline',
}
</script>

<style lang="scss" scoped>

.head-container{
  color: $color-secondary2;
  padding-top: 10px;
  padding-bottom: 5px;
}
hr{
  margin-top:0px;
  margin-bottom: 8px;
  height: 4px;
  border: none;
  background: $color-secondary2;
}
</style>