<template>
  <div class="action-button" @click="$emit('trigger', $event.target)">
    <text-icon :icon="icon" :text="actionName"/>
  </div>
</template>

<script>
import TextIcon from './TextIcon.vue'
export default {
  components: { TextIcon },
  name: 'ActionButton',
  props: {
    icon: String,
    actionName: String
  }
}
</script>

<style lang="scss" scoped>
.action-button{
    background-color:white;
    color: $color-secondary2;
    font-weight: bold;
    text-align:left;
    padding:20px;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
}
</style>