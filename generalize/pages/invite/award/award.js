// pages/invite/award/award.js 邀请有礼
import network from '../../../network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '邀请有礼',
    })
    this.setData({
      url: network.webUrl+'/activity/invitation?os=app_wxxcx&access_token=' + getApp().getToken()
    })
  
  },

})