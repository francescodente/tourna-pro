export default {
  updated: function(e) {
    if(this.scope) this.scope.input(e);
    this.$emit("input", e.target.value);
  },
  blur: function(e) {
    if(this.scope) this.scope.blur(e);
  },
  focus: function(e) {
    if(this.scope) this.scope.focus(e);
  }
}