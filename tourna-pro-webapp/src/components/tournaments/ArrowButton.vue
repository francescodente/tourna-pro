<template>
  <div class="my-button">
    <div class="text">
      {{text}}
    </div>
    <div class="right-text">
      <slot></slot>
    </div>
    <div class="icon">
      <i class="fas fa-angle-right fa-lg"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArrowButton',
  props: {
    text: String
  }
}
</script>

<style lang="scss" scoped>
.my-button{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin: 15px 5%;
  padding: 20px 10px;
  border-radius: 20px;
  border: 2px solid  $color-not-focus-text;
  box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.3);
}

.text{
  flex: 2 2;
  text-align: left;;
}

.right-text {
  margin-right: 30px;
  text-align:right;
  flex: 1 1;
}

.icon{
  color: $color-not-focus-text;
}

</style>