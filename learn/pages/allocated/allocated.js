// pages/allocated/allocated.js
import {
  pRequest
} from '../../utils/requestUtils.js'

var page = {
  pageNo: 1,
  pageSize: 10,
  pageCount:1,
};
var isLoading = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },

  allocatedCounselor: function(e) {
    var personClientId = e.currentTarget.dataset.id
    var shopId = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '/pages/allocated/chooseCounselor/chooseCounselor?personClientId=' + personClientId + '&shopId=' + shopId,
    })
  },
  cancelAllocate: function(e) {
    
    pRequest('com/client/cancelPerson',{
      id:e.currentTarget.dataset.id
    }).then((resp)=>{
      wx.showToast({
        title: '分配已取消',
      })
      this.refresh()
    }).catch((err)=>{
      
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
    pRequest('com/clue/findAllocated',{
      page:page,
    }).then((resp)=>{
      loadingFinish()
      if (page.pageNo == 1) {
        //debugger
        this.setData({
          list: createList(resp.list)
        })
      } else {
        this.setData({
          list: this.data.list.concat(createList(resp.list))
        })
      }
      page = resp.page
    }).catch((err)=>{
      loadingFinish()
      page.pageNo--
    })
    // pRequest()
  },
  callPhone: function (e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  }

})

function loadingFinish() {
  isLoading = false
  wx.hideLoading()
}

function createList(list) {
  return list.map((item)=>{
    return {
      name: item.clientName,
      phone: item.clientPhone,
      allocatedTime: calcDayNumber(item.allotTime),
      time: item.nextFollowTime,
      source: item.source,
      type: item.clueType,
      course: {
        courseName: item.courseName,
        store: item.shopName,
        counsoler: item.personName,
        counsolerId: item.personId
      },
      clueId: item.clueId,
      personClientId: item.personClientId,
      shopId:item.shopId,
      id:item.id
    }
  })
}

function calcDayNumber(time){
  if(!time){
    return "刚刚分配"
  }
  var allocateTime = new Date(time.replace(/\-/g, "/")).getTime()
  console.log(allocateTime)
  var nowTime=Date.now()
  console.log(nowTime)
  var diff = nowTime-allocateTime
  var day=(diff/(3600*24*1000)).toFixed(0)
  if(day>0){
    return '已分配'+day+'天'
  }else{
    var hour = (diff / (3600  * 1000)).toFixed(0)
    if(hour>0){
      return '已分配' + hour + '小时'
    }else{
     // debugger
      var min=(diff/(60*1000)).toFixed(0)
      if(min>5){ 
        return '已分配' + min + '分钟'
      }else{
      //  debugger
        return '刚刚分配'
      }
    }
  }

}