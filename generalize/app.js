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
  getToken() {
    return this.globalData.token;
  },
  savePhoen(phone) {
    wx.setStorageSync('phone', phone)
    this.globalData.phone = phone
  },
  getPhone() {
    return this.globalData.phone;
  },
  getLocation() {
    return [this.globalData.latitude, this.globalData.longitude]
  },
  saveShareQuery(shareQuery) {
    wx.setStorageSync('shareQuery', shareQuery)
    this.globalData.shareQuery = shareQuery
  },
  getShareQuery() {
    return this.globalData.shareQuery;
  },
  globalData: {
    userInfo: null,
    formIds: [],
    token: "5608840390de429ab7e7cc3ee5b9c60c",
    access_token: '',
    phone: '',
    appId: 'zxMXxPruU6Zf24hmyX',
    code: '',
    rpxRatio: '',
    wxCode: '',
    latitude: '',
    longitude: '',
    shareQuery: '',
  },
  putExtraDate(api, data) { },
  isLogin() {
    let isLogin = this.globalData.token && this.globalData.token != '' && this.globalData.token != null && this.globalData.token != 'null'
    return isLogin
  },
  initGlobalData() {
    var token = wx.getStorageSync('token')
    var phone = wx.getStorageSync('phone')
    var shareQuery = wx.getStorageSync('shareQuery')
    this.globalData.token = token
    this.globalData.phone = phone
    this.globalData.shareQuery = shareQuery
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
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.globalData.latitude = res.latitude
        that.globalData.longitude = res.longitude
      },
      fail: function (err) {
        console.log('location error:', err)
        wx.authorize({
          scope: 'scope.userLocation',
          success: function (res) {

          },
        })
      }
    })
    // this.initAccessToken()

  },
  initAccessToken() {
    var access_token = wx.getStorageSync('access_token')
    if (access_token) {
      var expires_date = wx.getStorageSync('expires_date')
      if (Date.now() < expires_date) { //access_token 没有过期
        this.globalData.access_token = access_token
        return
      }
    }
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=&secret=',
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
