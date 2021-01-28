export default {
  notEmpty: function (x) {
    return x != "";
  },
  checkLength: function (x, n) {
    return x.length > n;
  },
  checkMail: function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  onlyNumbers: function (x) {
    return /^\d+$/.test(x);
  },
  phoneNumber: function(x){
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(x.value.match(phoneno)) {
      return true;
    }
    else {
      alert("message");
      return false;
    }
  }
}