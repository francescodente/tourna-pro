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
    blur(e){
      this.validate(e.target.value)
      this.firstBlur = false;
    },
    focus(e){
      //this.validate(e.target.value)
    },
    input(e){
      if(!this.firstBlur) this.validate(e.target.value)
    },
    validate(field) {
      let res = this.validator(field)
      this.$emit("input", res);
      this.showError = !res
      if(!res) {
        this.cssClass = "error common"
      } else {
        this.cssClass = "common"
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.common {
  text-align:left;
}
.error-tooltip {
  color: red;
}
</style>