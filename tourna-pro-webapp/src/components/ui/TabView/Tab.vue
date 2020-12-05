<template>
  <div v-show="isActive" class="my-tab-body">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    title: {required: String},
    color: {default: "inherit"},
    selected: { default: false }
  },
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    this.isActive = this.selected;
  },
};
</script>

<style lang="scss" scoped>
.my-tab-body{
  height:100%;
}
</style>