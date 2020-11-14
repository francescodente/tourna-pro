<template>
  <div class="action-button" @click="action">
    <img class="icon" :src="icon.src" :alt="icon.alt"/>
    <span>{{actionName}}</span>
  </div>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    icon: Object,
    actionName: String,
    action: Function
  }
}
</script>

<style lang="scss" scoped>
.action-button{
    background-color:white;
    color: $color-secondary2;
    font-weight: bold;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.40);
}
</style>