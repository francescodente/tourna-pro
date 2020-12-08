<template>
  <div class="action-button" @click="$emit('trigger', $event.target)" :style="{color: this.color}">
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
    actionName: String,
    color: {default: "inherit"}
  }
}
</script>

<style lang="scss" scoped>
.action-button{
    background-color:white;
    font-weight: bold;
    text-align:left;
    padding:20px;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
}
</style>