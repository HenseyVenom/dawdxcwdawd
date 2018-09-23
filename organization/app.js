//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.initGlobalData()
  },
  saveToken(token) {  
    
    wx.setStorageSync('token', token)
    this.globalData.token = token
  },
  getToken(){
    return  wx.getStorageSync('token')
    //console.log()
    // return this.globalData.token
  },
  savebank(bank){
    wx.setStorageSync('bank', bank)
    this.globalData.bankinformation = bank
  },
  //存储userId
  saveUserId(userId){
    wx.setStorageSync('userId', userId)
    this.globalData.userId = userId
  },
  getbank(){
    return wx.getStorageSync('bank')
  },
  getUserId(){
    return wx.getStorageSync('userId')
  },
  globalData: {
    userInfo: null,
    formIds: [],
    token: "123123123123",
    appId: 'wx7229fe36d879ec8f',
    code: '',
    rpxRatio: '',
    wxCode: '',
    bankinformation:{},
    userId:''
  },
  putExtraDate(api, data) { },
  isLogin() {
    let isLogin = this.globalData.token && this.globalData.token != '' && this.globalData.token != null && this.globalData.token != 'null'
    return isLogin
  },
  initGlobalData() {
    
 
 
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.rpxRatio = res.windowWidth / 750
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('naviback')
          wx.navigateBack({
            delta: -1
          })
        }
      }
    })
  },

})