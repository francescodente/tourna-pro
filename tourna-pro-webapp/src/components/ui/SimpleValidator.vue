<template>
  <div :class="cssClass">
    <slot :blur="blur" :focus="focus" :input="input"></slot>
    <small v-if="showError" class="error-tooltip">{{errorText}}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cssClass: "common",
      showError: false,
      firstBlur: true,
    }
  },
  props: {
    errorText: String,
    validator: Function,
    value: Boolean
  },
  methods: {
    blur(value){
      this.validate(value)
      this.firstBlur = false;
    },
    focus(value){
      //this.validate(value)
    },
    input(value){
      this.$emit("input", this.validator(value));
      if(!this.firstBlur) this.validate(value)
    },
    validate(field) {
      let res = this.validator(field)
      this.showError = !res
      if(!res) {
        this.cssClass = "error common"
      } else {
        this.cssClass = "common"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.common {
  text-align:left;
}
.error-tooltip {
  color: $color-secondary2;
}
</style>