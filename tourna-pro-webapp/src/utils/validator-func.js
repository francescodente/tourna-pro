export default {
  notEmpty: function (x) {
    return x != "";
  },
  checkLength: function (x, n) {
    return x.length >= n;
  },
  checkMail: function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  onlyNumbers: function (x) {
    return /^\d+$/.test(x);
  },
  minNumber: function(x, n){
    return Number(x)>=n
  },
  checkBox: function(x){
    return x
  }
}