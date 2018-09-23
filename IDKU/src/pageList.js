const allList=[]
allList.push(firstPage)
export const pageList=allList.concat(secondBattalionCommander).concat(dan).concat(shui)
// export const pageList =function () {
//   var pageList=[]
//   pageList.push(firstPage)
//   return pageList.concat(secondBattalionCommander).concat(dan).concat(shui)
// }

var  firstPage='pages/login/login'
var secondBattalionCommander=[
  'pages/payToShop',
  'pages/buyCourse',
  'pages/mine',
  'pages/index',
  'pages/setting/bankcard/pinless',
  'pages/setting/personal/personal',
  'pages/setting/personal/selectAddress',
  'pages/setting/personal/address',
  'pages/setting/personal/personName',
  'pages/courseRecord/courseRecord',
  'pages/courseList',
  "pages/babyrecord/babyrecord",
  'pages/booking',
]
var dan=[
  'pages/courseDetail',
  'pages/setting/bankcard/bankcard',
  'pages/setting/setting',
  'pages/schedule',
  'pages/shell',
  'pages/storeList',
  'pages/coupons',
  'pages/myCourse',
  'pages/news',
  'pages/cardPack',
  'pages/compact',
  'pages/courseRecord/comment',
  'pages/reserveCourse',
  'pages/wallet/incomeAndExpenditure/incomeAndExpenditure',
  'pages/awardRecord/awardRecord',
]
var shui=[
  'pages/invite/award/award',
  'pages/share/share',
  'pages/babyrecord/addbaby/addbaby',
  'pages/activityDetail',
  'pages/courseOrder',
  'pages/orderDetail'
]
