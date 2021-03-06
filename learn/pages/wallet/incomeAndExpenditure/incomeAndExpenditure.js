// pages/wallet/incomeAndExpenditure/incomeAndExpenditure.js
import {
  pRequest
} from "../../../utils/requestUtils.js"
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist: [{
      name: '全部',
      value: '',
      },
      {
        name: '注册',
        value: 'registerBackQB',
      },
      {
        name: '预约试听课',
        value: 'courseSignBackQB',
      },
      {
        name: '购买课程',
        value: 'buyCourseBackQB',
      }
    ], 
    multiArrayDate: [[],[]],
    multiIndex: [118, 7],
    yearMonth: '',
    sourceType: '',
    personList: [],
    monthIncome: 0,
    monthOutlay: 0,
    currentDate: '',
    showMonthText: '本月',
    pO: {
      page: 0,
      size: 20
    },
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentDate: new Date(),
      yearMonth: new Date().pattern('YYYY-MM') + '-01'
    })
    let yearArr = this.data.multiArrayDate[0]
    let MonthArr = this.data.multiArrayDate[1]
    for (let i = 2018; i < 2100; i++) {
      yearArr.push(i + '年')
    };
    for (var j = 1; j < 13; j++) {
      if (j < 10) {
        let num = '0' + j
        MonthArr.push(j + '月')
      } else {
        MonthArr.push(j + '月')
      }
    }
    this.setData({
      multiArrayDate: [yearArr, MonthArr]
    })
    this.getPersionList()
  },
  //选择日期的下表
  bindMultiPickerChange: function (e) {
    var year = this.data.multiArrayDate[0][e.detail.value[0]];
    year = year.substring(0, year.length - 1)
    var month = this.data.multiArrayDate[1][e.detail.value[1]];
    month = month.substring(0, month.length - 1)
    if (month < 10) {
      month = '0' + month
    }
   // this.setShowMonthText(year, month)
    this.setData({
      yearMonth: year + '-' + month + '-01',
      showMonthText: year + '年' + month+'月'
    })
    this.onPullDownRefresh()
  },
  //tab切换
  switchTab: function (e) {
    this.setData({
      sourceType: e.currentTarget.dataset.val
    })
    this.onPullDownRefresh()

  },
  setShowMonthText(year, month) {
    var showMonthText;
    if (year == this.data.currentDate.getFullYear()) {
      if (month == (this.data.currentDate.getMonth() + 1)) {
        showMonthText = '本月'
      } else {
        showMonthText = month + '月'
      }
    } else {
      showMonthText = year + '年' + month + '月'
    }
    this.setData({
      showMonthText: showMonthText
    })
  },
  onPullDownRefresh: function () {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      ['pO.page']: 0
    })
    this.getPersionList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoading) {
      return
    }
    if (this.pO.totalPage == this.data.pO.page) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return
    }
    this.setData({
      ['pO.page']: this.data.pO.page + 1
    })
    this.getPersionList()
  },
  getPersionList: function () {
    this.data.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    var url = 'xb/front/unAuth/myBalanceInOutList?phone=' + getApp().getPhone() + '&nowDate=' + this.data.yearMonth + "&clientId=personal&clientSecret=personal&page=" + this.data.pO.page + '&size=' + this.data.pO.size
    if (this.data.sourceType) {
      url += ('&sourceType=' + this.data.sourceType)
    }
    pRequest(url).then((res) => {
      this.loadingFinish()
      if (this.data.pO.page == 0) {
        this.setData({
          personList: createList(res.finPopularityInOutLogList.content)
        })
      } else {
        this.setData({
          personList: this.data.personList.concat(createList(res.finPopularityInOutLogList.content))
        })
      }
      this.setData({
        ['pO.totalPage']: res.finPopularityInOutLogList.totalPages,
        ['pO.page']: res.finPopularityInOutLogList.number,
        monthIncome: res.amountIncome ? res.amountIncome : 0,
        monthOutlay: res.amountOutlay ? res.amountOutlay : 0
      })
    }).catch((err) => {
      this.loadingFinish()
    })
  },
  loadingFinish: function () {
    wx.stopPullDownRefresh()
    this.data.isLoading = false
    wx.hideLoading()
    if (this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: false
      })
    }
  },
})

function createList(list) {
  if (!list)
    return [];
  list.forEach((item)=>{
    item.createAt=new Date(item.createAt).pattern("YYYY年MM月dd日")
  })  
  return list
}