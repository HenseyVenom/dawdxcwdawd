
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 Date()).pattern("YYYY-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("YYYY-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("YYYY-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("YYYY-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("YYYY-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
// .replace(/\-/g, "/")
Date.prototype.pattern = function (fmt) {
  if (fmt == null || fmt == '') {
    return fmt
  }
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  let week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substring(("" + o[k]).length)));
    }
  }
  return fmt;
};
export function jsGetAge(strBirthday){
  var returnAge = []
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()
  if (nowYear == birthYear) {
    returnAge[0] = 0//同年 则为0岁
    // returnAge = 0//同年 则为0岁
    var monthDiff = nowMonth - birthMonth//月之差
    if (monthDiff > 0) {//返回几个月
      returnAge[1]=monthDiff
      // returnAge = returnAge + 0.1 * monthDiff
    }else{
      returnAge[1]=0
    }
  } else {
    var ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        returnAge[0] = ageDiff
      } else {
        var monthDiff = nowMonth - birthMonth//月之差
        if (monthDiff < 0) {
          // returnAge = ageDiff - 1
          returnAge[0] = ageDiff - 1
          if (returnAge == 0) {
            // returnAge += 0.1 * (monthDiff + 12)
            returnAge[1] = (monthDiff + 12)
          }
        }
        else {
          // returnAge = ageDiff
          returnAge[0] = ageDiff
        }
      }
    }
    else {
      // returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      returnAge[0] = 0//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge//返回年龄数组
}

Array.prototype.contains = function ( needle ) {
  for (var i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}

