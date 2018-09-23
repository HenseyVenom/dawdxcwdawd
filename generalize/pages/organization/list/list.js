// pages/invite/list/list.js
import {
  pRequest
} from "../../../utils/requestUtils.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pO: {
      page: 1,
      size: 10
    },
    isLoading: false,
    isLoadingMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onPullDownRefresh()
  },

  enteroraganFun: function (e) {
    var i = e.currentTarget.dataset.i
    wx.navigateTo({
      url: '/pages/organization/detail/detail?id=' + this.data.list[i].id+"&shopId="+this.data.list[i].shopId,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      ['pO.page']: 0
    })
    this.getPageList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoading) {
      return
    }
    if (this.data.pO.totalPage == this.data.pO.page+1) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return
    }
    this.setData({
      ['pO.page']: this.data.pO.page + 1,
      isLoadingMore: true
    });
    this.getPageList()
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
  getPageList: function () {
    this.data.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    var url = 'front/unAuth/organShop/shopActivityListByWxMini?page=' + this.data.pO.page + '&size=' + this.data.pO.size
    // if (getApp().getLocation() && getApp().getLocation()[0]) {
    //   url += ('&latitude=' + getApp().getLocation()[0] + '&longitude=' + getApp().getLocation()[1])
    // }
    pRequest(url).then((res) => {
      wx.stopPullDownRefresh()
      this.loadingFinish()
      if (this.data.pO.page == 0) {
        this.setData({
          list: createList(res.content)
        })
      } else {
        this.setData({
          list: this.data.list.concat(createList(res.content))
        })
      }
      this.setData({
        ['pO.totalPage']: res.totalPages,
        ['pO.page']: res.number,
      })
    }).catch((res) => {
      wx.stopPullDownRefresh()
    })
  },
})
function createList(list) {
  list.forEach((item)=>{
    if (item.distan>1000){
      item.distan=(item.distan/1000).toFixed(1)+'km'
    }else{
      item.distan = item.distan +'m'
    }
  })
  return list;
}