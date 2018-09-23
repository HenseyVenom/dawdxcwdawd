//index.js
//获取应用实例
import { pRequest } from '../../utils/requestUtils.js';
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wallet:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  itemClick(e) {
    var name = e.currentTarget.dataset.name
    var path = e.currentTarget.dataset.path
  //  debugger
    wx.navigateTo({
      url: '/pages/' + (path ? path + '/' : '') + name + '/' + name + "?creditTotalAmount=" + this.data.wallet.creditTotalAmount,
    })
    
    //   wx.navigateTo({
    //     url: "/pages/particulars/particulars"
    // })
   
    
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    //}
  
  },

  onShow: function () {
    this.presentShellFun()
  },
  //获取账号积分数据
  presentShellFun: function () {
    console.log(app.getToken())
   // let url = 'front/unAuth/wxMini/getIntegralData?token=' + '123123123123'
    let url = 'front/unAuth/wxMini/getIntegralData?token=' + app.getToken()
    pRequest(url, {
    })
      .then(res => {
        this.setData({
          wallet: res
        })
      })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
