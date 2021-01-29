export default {
  updated: function(value) {
    if(this.scope) this.scope.input(value);
    this.$emit("input", value);
  },
  blur: function(value) {
    if(this.scope) this.scope.blur(value);
  },
  focus: function(value) {
    if(this.scope) this.scope.focus(value);
  }
}