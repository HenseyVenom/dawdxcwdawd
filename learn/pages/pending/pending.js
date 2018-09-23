// pages/pending/pending.js
import {
  pRequest
} from '../../utils/requestUtils.js'
var page = {
  pageNo: 1,
  pageSize: 10,
  pageCount: 1
};
var isLoading = false; //分页数据是否加载中
var requestCount = 0
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    dateType: 1,
    showBookModal: false,
    userType: app.getUserType(),
    personClientId: '',
    courseName: '',
    clueId: '',
    isLoadingMore: false,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  knowEvent(e){
    console.log(e.currentTarget.dataset.clueid)
    // debugger
    let clueId = e.currentTarget.dataset.clueid
    pRequest('com/clue/isAffirm', {
      clueId: clueId
    }).then((res) => {
      wx.hideLoading()
      this.setData({
        
      })
      this.refresh()
    }).catch((err) => {
      wx.hideLoading()
    })
  },
  allocatedCounselor: function(e) {
    var i = e.currentTarget.dataset.i;
    var clientId = this.data.list[i].clientId
    var shopId = this.data.list[i].shopId
    wx.navigateTo({
      url: '/pages/allocated/chooseCounselor/chooseCounselor?personClientId=' + clientId + '&shopId=' + shopId
    })
  },
  enterPersonDetail:function(e){
    let clinetid = e.currentTarget.dataset.clinetid
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone

    //debugger
    wx.navigateTo({
      url: '/pages/userManage/detail/detail?id=' + clinetid + '&name=' + name + '&phone=' + phone,
    })
  },

  
  book: function(e) {
    var i = e.currentTarget.dataset.i
    this.setData({
      courseName: this.data.list[i].course.courseName,
      clientId: this.data.list[i].clientId,
      clueId: this.data.list[i].clueId,
      showBookModal: true
    })
  },
  confirmDate: function(e) {
    
    wx.showLoading({
      title: '处理中',
    })
    let courseName = this.data.courseName ? this.data.courseName : e.detail.courseName;
    pRequest('com/task/toShopDateSet', {
      inviteDate: e.detail.date + ' ' + e.detail.time + ":00",
      clientId: this.data.clientId,
      courseName: courseName,
      clueId: this.data.clueId,
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
  addRecord: function(e) {
    var i = e.currentTarget.dataset.i
    var clientId = this.data.list[i].clientId
    var name = this.data.list[i].name
    var phone = this.data.list[i].phone
    wx.navigateTo({
      url: '/pages/userManage/newFollowRecord/newFollowRecord?personClientId=' + clientId + '&name=' + name + "&phone=" + phone
    })
  },
  callUp:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  changeFilter: function(e) {
    this.setData({
      dateType: e.detail.filteIndex
    })
    page.pageNo = 1;
    this.getList()
  },
  signInFun:function(e){
    var i = e.currentTarget.dataset.i
    pRequest('com/task/sgin', {
      id: this.data.list[i].relatedId,
      clientId: this.data.list[i].clientId
    }).then((res) => {
     
      this.refresh()
    }).then((err) => {

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
    this.setData({
      isLoadingMore: true
    })
    page.pageNo++;
    this.getList()
  },
  getList() {
    isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    requestCount++
    pRequest('com/clue/findPend', {
      page: page,
      screenDateType: this.data.dateType
    }).then((res) => {
      this.loadingFinish()
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
      this.loadingFinish()
      page.pageNo--
    })
  },
  callPhone: function(e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  },
  loadingFinish: function() {
    isLoading = false
    requestCount--
    if (requestCount == 0) {
      wx.hideLoading()
    }
    if (this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: false
      })
    }
  }

})

function createList(list) {
  return list.map((item) => {
    return {
      name: item.clientName,
      phone: item.clientPhone,
      allocatedTime: item.allotTime,
      time: item.clueDate,
      source: item.source,
      type: item.clueType,
      relatedId: item.relatedId,
      course: {
        courseName: item.courseName,
        store: item.shopName
      },
      clueId: item.clueId,
      clientId: item.clientId,
      shopId: item.shopId,
      allot: item.allot, //是否显示分配按钮
      personClientId: item.personClientId,
      remarks: item.remarks

    }
  })
}