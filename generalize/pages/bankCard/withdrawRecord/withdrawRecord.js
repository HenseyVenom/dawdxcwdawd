// pages/bankCard/withdrawRecord/withdrawRecord.js
import {
  pRequest
} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pO: {
      page: 0,
      size: 20
    },
    recordList: [],
    isLoadingMore: false,
    isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      ['pO.page']: 0,
      isLoadingMore: false
    });
    this.getRecordList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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
      ['pO.page']: this.data.pO.page + 1,
      isLoadingMore: true
    });
    this.getRecordList()
  },

  getRecordList() {
    this.data.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    pRequest('front/unAuth/wxMini/withdrawDepositRecord?page=' + this.data.pO.page + '&size=' + this.data.pO.size).then((res) => {
      wx.stopPullDownRefresh()
      this.loadingFinish()
      if (this.data.pO.page == 0) {
        this.setData({
          recordList: createList(res.content)
        })
      } else {
        this.setData({
          recordList: this.data.recordList.concat(createList(res.content))
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
  loadingFinish: function() {
    this.data.isLoading = false
    wx.hideLoading()
    if (this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: false
      })
    }
  },

})
function createList(OList) {
  return OList.map((item)=>{
    return item
  })
}