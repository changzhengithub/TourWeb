function checkPhone(phone) {
  phone = phone ? phone.replace(/\s+/g, '') : phone;
  if (!phone || phone.length < 11) {
    return false;
  } else {
    var reg = new RegExp('^(?:13|14|15|16|17|18|19)[0-9]{9}$', 'i');
    if (!reg.test(phone)) {
      return false;
    }
    return true;
  }
}

function isEmail(str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) != true) {
    return false;
  } else {
    return true;
  }
}