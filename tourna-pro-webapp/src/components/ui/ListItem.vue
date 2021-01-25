<template>
  <div :class="classes" @click="onSelect">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    canSelect: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSelect(e) {
      if (!this.canSelect) {
        return
      }
      this.$emit('selected', e)
    }
  },
  computed: {
    classes() {
      return {
        'list-item': true,
        'clickable': this.canSelect
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 3px 7px -2px rgba(0,0,0,0.2);

  &.clickable:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
}
</style>