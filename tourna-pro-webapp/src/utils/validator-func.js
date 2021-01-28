export default {
  notEmpty: function(x) {
    return x != "";
  },
  checkLength: function(x,n) {
    return x.length > n
  },
  onlyNumbers: function(x) {
    return false
  }
}