// pages/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      userType: app.getUserType()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  
  //调到客户等级设置
  entergrade:function(e){
    wx.navigateTo({
      url:'clientLevelSettings/clientLevelSettings'
    })
  },
  //调到人员管理
  enterinfo:function(e){
    wx.navigateTo({
      url: 'staffManage/staffManage'
    })
  },

   //调到绑定门店
  enterbound:function(e){
    wx.navigateTo({
      url: 'boundStore/boundStore'
    })
  },
  enterlogin:function(e){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (action) => {
        if (action.confirm) {
          app.saveToken(null);
          wx.reLaunch({
            url: '../login/login',
          })
        } else {

        }
      }
    })
  },

 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})