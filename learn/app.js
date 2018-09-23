//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.initGlobalData()
    // this.initAccessToken()
    // this.getGradeList()
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log('success:',res)
    //     that.globalData.wxCode=res.code
    //   }
    // })
  },
  saveToken(token) {
    wx.setStorageSync('token', token)
    this.globalData.token = token
    if (token == null) {
      // this.saveMallLoginInfo(null, null)
      // this.saveChatUserInfo(null)
      // if (this.globalData.jim.isLogin()) {
      //   this.globalData.jim.loginOut()
      // }
    }
  },
  saveXbToken(token){
    wx.setStorageSync('xBToken', token)
    this.globalData.xbToken = token
  },
  getToken(){
    return this.globalData.token
  },
  getXbToken() {
   /// debugger
    return this.globalData.xbToken
  },
  savePhone(phone) {
    wx.setStorageSync('phone', phone)
    this.globalData.phone = phone
  },
  getPhone() {
    return this.globalData.phone;
  },
  globalData: {
    userInfo: null,
    formIds: [],
    token: "5608840390de429ab7e7cc3ee5b9c60c",
    appId: 'wx100d05a87d9268f8',
    code: '',
    rpxRatio: '',
    wxCode: '',
    gradeList:null,
    shopUserType:1,//1管理员，2顾问,
    xbToken:'',
    phone:'',
    shareQuery:'',
    xbName:'',
    access_token: '',
    shopId:''
  },
  saveShareQuery(shareQuery) {
    wx.setStorageSync('shareQuery', shareQuery)
    this.globalData.shareQuery = shareQuery
  },
  getShareQuery() {
    return this.globalData.shareQuery;
  },
  getUserType(){
    return this.globalData.shopUserType
  },
  setUserType(shopUserType){
    console.log(shopUserType)
    this.globalData.shopUserType=shopUserType
  },
  putExtraDate(api, data) {},
  isLogin() {
    let isLogin = this.globalData.token && this.globalData.token != '' && this.globalData.token != null && this.globalData.token != 'null'
    return isLogin
  },
  isLoginXb(){
    let isLogin = this.globalData.xbToken && this.globalData.xbToken != '' && this.globalData.xbToken != null && this.globalData.xbToken != 'null'
     return isLogin
  },
  saveXbName(name) {
    wx.setStorageSync('xbName', name)
    this.globalData.xbName = name
  },
  getXbName(){
    return this.globalData.xbName
  },
  saveShopId(shopId){
    wx.setStorageSync('shopId', shopId)
    this.globalData.shopId = shopId
  },
  getShopId(){
    return this.globalData.shopId
  },
  initGlobalData() {
    var token = wx.getStorageSync('token')
    var phone = wx.getStorageSync('phone')
    var shareQuery = wx.getStorageSync('shareQuery')
    this.globalData.token = token
    this.globalData.phone = phone
    this.globalData.xbToken = wx.getStorageSync('xBToken')
    this.globalData.shareQuery = shareQuery
    this.globalData.shopId = wx.getStorageSync('shopId')
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
  // getGradeList(callBack){
  //   pRequest('grade/list',{}).then((res)=>{
  //     this.globalData.gradeList=res
  //     if(callBack){
  //       callBack(res)
  //     }
  //   })
  // }
initAccessToken(code) {
  // var access_token = wx.getStorageSync('access_token')
  // if (access_token) {
  //   var expires_date = wx.getStorageSync('expires_date')
  //   if (Date.now() < expires_date) { //access_token 没有过期
  //     this.globalData.access_token = access_token
  //     return
  //   }
  // }
  var that = this
  wx.request({
    // url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx100d05a87d9268f8&secret=565466218600168fce6e6fb22b3c5a6d',
    url:'https://api.weixin.qq.com/sns/jscode2session?appid=wx100d05a87d9268f8&secret=565466218600168fce6e6fb22b3c5a6d&js_code='+code+'&grant_type=authorization_code',
    method: 'GET',
    success: function (res) {
      console.log(res)
      that.saveAccessToken(res.data)
    },
    fail: function (err) {
      console.log('err:', err)
    }
  })
},
saveAccessToken(res) {
    wx.setStorageSync('access_token', res.access_token)
    this.globalData.access_token = res.access_token
    wx.setStorageSync('expires_date', res.expires_in + Date.now())
  },
  getAccessToken() {
    return this.globalData.access_token
  }
})

