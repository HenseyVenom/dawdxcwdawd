// pages/orderManage/orderManage.js
import {
  pRequest
} from '../../utils/requestUtils.js'
var page = {
  pageNum: 1,
  pageSize: 10,
  pageCount: 1
};
var isLoading = false;
var requestCount = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    dateType: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  changeFilter: function(e) {
    this.setData({
      dateType: e.detail.filteIndex
    })
    page.pageNo = 1;
    this.getList()
  },
  addRecord: function (e) {
    var i = e.currentTarget.dataset.i
    var personClientId = this.data.list[i].clientId
    var name = this.data.list[i].name
    var phone = this.data.list[i].phone
    wx.navigateTo({
      url: '/pages/userManage/newFollowRecord/newFollowRecord?personClientId=' + personClientId + '&name=' + name + "&phone=" + phone
    })
  },
  refresh() {
    if (isLoading) {
      return
    }
    page.pageNum = 1;
    this.getList()
  },
  loadMore() {
    if (isLoading) {
      return
    }
    if (page.pageCount == page.pageNo) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return
    }
    page.pageNum++;
    this.getList()
  },
  getList() {
    isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    requestCount++
    pRequest('com/clientDeal/pageList', {
      page: page,
      screenDateType: this.data.dateType,
    }).then((res) => {
      loadingFinish()
      if (page.pageNo == 1) {
        this.setData({
          list: createList(res.list)
        })
      } else {
        this.setData({
          list: this.data.list.concat(createList(res.list))
        })
      }
      page = res.page
    }).catch((err) => {
      loadingFinish()
      page.pageNo--
    })
  },
  callPhone: function (e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  }

})

function createList(list) {
  return list.map((item) => {
    return {
      name: item.clientName,
      phone: item.clientPhone,
      time: item.createDate,
      source: item.source,
      course: {
        courseName: item.courseName,
        store: item.shopName,
        counsoler: item.personName
      },
      orderNumber: item.orderCode,
      payMoney: item.money,
      payWay: item.payWay,
      clientId: item.clientId,
      personClientId: item.personClientId,

    }
  })
}

function loadingFinish() {
  isLoading = false
  requestCount--
  if (requestCount == 0) {
    wx.hideLoading()
  }
}