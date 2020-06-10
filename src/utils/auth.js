/*
  session 读写
 */
import moment from 'moment'

/**
 * @param {*需要加密的字符串 注：对象转化为json字符串再加密} word
 * @param {*aes加密需要的key值，这个key值后端同学会告诉你} keyStr
 */

//判断手机格式
export function testPhone(val) {
    let reg=/^1\d{10}$/;
    if(!reg.test(val)){
      return false
    }
    return true
}
//时间格式
export function getDateTime(date){
    return moment(date).format('YYYY-MM-DD') + ' ' + date.toTimeString().slice(0)
}

export function setToken(key, value) {
  return sessionStorage.setItem(key, value)
}

export function getToken(key) {
  return sessionStorage.getItem(key)
}

export function removeToken(key) {
  if (!key) {
    return sessionStorage.clear()
  }
  return sessionStorage.removeItem(key)
}

export function setCookieToken(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

export function getCookieToken(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

export function removeCookieToken(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookieToken(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//随机字符串
export function getRandomString(n){
    n = n || parseInt(Math.random()*(36-5+1)+5,10);
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let str = '';
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        str += chars[id];
    }
    return str;
}

