const version = 3
const version_name = "1.0.3"
const notConfirmFunc = ['升阶记录', '专属顾问']

function currentVersionIsVisiable(func) {
  var index = notConfirmFunc.indexOf(func)
  console.log('i:', index)
  if (index >= 0) {
    return false;
  }
  switch (func) {
    case '我的教练':
    case '升阶记录':
    case '专属顾问':
      return version > 2
  }
}
module.exports = {
  currentVersionIsVisiable: currentVersionIsVisiable
}