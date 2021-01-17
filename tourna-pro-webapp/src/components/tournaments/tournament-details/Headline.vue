<template>
  <div>
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

h2{
  color: $color-secondary2;
  margin-top: 10px;
  margin-bottom: 5px;
}
hr{
  margin-top:0px;
  margin-bottom: 8px;
  height: 4px;
  border: none;
  background: $color-secondary2;
}
</style>