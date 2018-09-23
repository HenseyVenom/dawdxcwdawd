// pages/bookManage/bookManage.js
import {
  pRequest
} from '../../utils/requestUtils.js'
var page = {
  pageNo: 1,
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
    showBookModal: false,
    dateType: 1,
    courseName: '',
    personClientId: '',
    clueId: '',
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

  book: function(e) {
    var i = e.currentTarget.dataset.i
    this.setData({
      id: this.data.list[i].id,
      showBookModal: true
    })

  },
  confirmDate: function(e) {
    wx.showLoading({
      title: '处理中',
    })
    pRequest('com/task/resetClientTime', {
      inviteDate: e.detail.date + ' ' + e.detail.time + ":00",
      id: this.data.id
    }).then((res) => {
      wx.hideLoading()
      this.setData({
        showBookModal: false
      })
      this.refresh()
    }).catch((err) => {
      wx.hideLoading()
    })
  },
  signIn: function(e) {
    var i = e.currentTarget.dataset.i
    pRequest('com/task/sgin',{
      id: this.data.list[i].id,
      clientId: this.data.list[i].clientId

    }).then((res)=>{
      wx.showToast({
        title: '签到成功',
        icon: 'none',
      })
      this.refresh()
    }).then((err)=>{

    })

  },
  addRecord: function(e) {
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
    page.pageNo = 1;
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
    page.pageNo++;
    this.getList()
  },
  getList() {
    isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    requestCount++
    pRequest('com/task/findToShopPlan', {
      page: page,
      screenDateType: this.data.dateType
    }).then((resp) => {
      loadingFinish()
      if (page.pageNo == 1) {
        this.setData({
          list: createList(resp.list)
        })
      } else {
        this.setData({
          list: this.data.list.concat(createList(resp.list))
        })
      }
      page = resp.page
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
      time: item.addTime,
      source: item.source,
      type: 1,
      course: {
        courseName: item.courseName,
        store: item.shopName,
        counsoler: item.personName
      },
      isSign: item.isSign,
      personClientId: item.personClientId,
      clientId: item.clientId,
      shopId: item.shopId,
      orderTime: item.inviteDate,
      isOut: new Date(item.inviteDate).getTime() < Date.now(),
      id: item.id,


    }
  })
}

function loadingFinish() {
  isLoading = false
  if(requestCount==0){
    console.log('error in then')
  }
  requestCount--
  console.log('requestCount:', requestCount)
  if (requestCount == 0) {
    wx.hideLoading()
  }
}