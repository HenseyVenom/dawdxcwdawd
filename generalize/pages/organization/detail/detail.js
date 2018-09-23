// pages/invite/detail/detail.js
import {
  pRequest,
  pGetRequest
} from '../../../utils/requestUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    autoplay: true,
    Isshow: false,
    activityId: '',
    activityDetail: {},
    shopId: '',
    rtn: '',
    rts: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.Isshow) {
      this.setData({
        Isshow: options.Isshow,
        rtn: options.rtn,
        rts: options.rts,
      })
    }
    this.setData({
      activityId: options.id,
      shopId: options.shopId
    })
    this.getActivityDetail()

  },
  getActivityDetail() {
    wx.showLoading({
      title: '加载中...',
    })
    pGetRequest('front/unAuth/organShop/viewActivity/v1/' + this.data.activityId).then((res) => {
      wx.hideLoading()
      this.setData({
        activityDetail: res
      })
      this.setData({
        //   ['shopDetail.classBanner']: JSON.parse(res.classBanner),
        ['activityDetail.activityDetail']: res.activityDetail.replace(/\<img/gi, '<img class="rich-img" '),
      })
    }).catch((err) => {
      wx.hideLoading()
    })
  },

  phoneFun: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },

  shareCourse(e) {
    wx.navigateTo({
      url: '/pages/share/share?id=' + this.data.activityId + '&type=2',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  //   console.log('activityId:', this.data.activityId)
  //   return {
  //     title: this.data.activityDetail.activityName,
  //     imageUrl: '/images/activity_on_sell.png',
  //     path: '/pages/organization/detail/detail?Isshow=true&id=' + this.data.activityId + '&shopId=' + this.data.shopId + '&' + getApp().getShareQuery()
  //   }
  // },
  buyCourse: function (e) {
    wx.navigateTo({
      url: '/pages/receive/login/login?rtn=' + this.data.rtn + '&rts=' + this.data.rts,
    })
  }
})