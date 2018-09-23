// pages/bankCard/bankCardManage/bankCardManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  itemClick(e) {
    var name = e.currentTarget.dataset.name
    var path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: '/pages/' + (path ? path + '/' : '') + name + '/' + name,
    })
  },
})