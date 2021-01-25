<template>
  <list-item class="action-button" @selected="$emit('trigger', $event.target)" :style="{color: this.color}">
    <text-icon :icon="icon + ' fa-fw'" :text="actionName"/>
  </list-item>
</template>

<script>
import ListItem from './ListItem.vue'
import TextIcon from './TextIcon.vue'
export default {
  components: { TextIcon, ListItem },
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
  font-weight: bold;
}
</style>