<template>
  <div class="action-button" @click="$emit('trigger', $event.target)">
    <img class="icon" :src="icon.src" :alt="icon.alt"/>
    <span>{{actionName}}</span>
  </div>
</template>

<script>
export default {
  model: {
    event: 'trigger'
  },
  name: 'ActionButton',
  props: {
    icon: Object,
    actionName: String
  }
}
</script>

<style lang="scss" scoped>
.action-button{
    background-color:white;
    color: $color-secondary2;
    font-weight: bold;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.40);
}
</style>