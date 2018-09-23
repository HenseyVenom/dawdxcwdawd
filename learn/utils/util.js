const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 Date()).pattern("YYYY-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("YYYY-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("YYYY-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("YYYY-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("YYYY-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
  if (fmt == null || fmt == "") {
    return fmt;
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


function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  var sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  var cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
  // return (((sign) ? '' : '-') + num );
}  

function filteremoji(content) {
  var ranges = [
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude50-\ude7f]',
    '\ud83d[\ude80-\udeff]',
'\u263a','\u270c','\u270a','\u26a1','\u2600','\u2601','\u2614','\u2b50','\u2615','\u2728','\u2764','\u26c4','\u26fa','\u26bd','\u26be','\u26f3','\ud83c','\udc04','\u26fd','\u2708','\u26f5','\u26f2','\u26ea','\ud83c','\udde8','\ud83c','\uddf3','\ud83c','\uddeb','\ud83c','\uddf7','\ud83c','\udde9','\ud83c','\uddea','\ud83c','\uddee','\ud83c','\uddf9','\ud83c','\uddef','\ud83c','\uddf5','\ud83c','\uddf0','\ud83c','\uddf7','\ud83c','\uddec','\ud83c','\udde7','\ud83c','\uddfa','\ud83c','\uddf8','\u2702','\ud83c','\ude50','\u3299','\ud83c','\ude35','\ud83c','\ude36','\ud83c','\ude1a','\ud83c','\ude38','\ud83c','\ude3a','\ud83c','\ude37','\ud83c','\ude39','\ud83c','\ude33','\ud83c','\ude02','\ud83c','\ude01','\ud83c','\ude2f','\u2733','\u2734','\ud83c','\udd9a','\ud83c','\udd70','\ud83c','\udd71','\ud83c','\udd8e','\ud83c','\udd7e','\ud83c','\udd94','\ud83c','\udd7f','\ud83c','\udd92','\ud83c','\udd95','\ud83c','\udd97','\ud83c','\udd99','\u2648','\u2649','\u264a','\u264b','\u264c','\u264d','\u264e','\u264f','\u2650','\u2651','\u2652','\u2653','\u267f','\u25b6','\u25c0','\u23e9','\u23ea','\u27a1','\u2b05','\u2b06','\u2b07','\u2197','\u2198','\u2199','\u2196','\u20e30','\u20e31','\u20e32','\u20e33','\u20e3'
  ];
  let emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
  return emojireg;
}

module.exports = {
  formatTime: formatTime,
  formatCurrency: formatCurrency,
  filteremoji: filteremoji
}
