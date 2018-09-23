// pages/login/login.js

import {
  pRequest
} from '../../utils/requestUtils.js'
const TIME_COUNT = 60
const app = getApp()
var wxCode = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    timeCount: 0,
    verifyCode: '',
    timer: null,
    needBack: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loginWx()
  },
  bindInputPhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  clearPhone: function(e) {
    this.setData({
      phoneNumber: ""
    })
  },
  bindInputPassword: function(e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  onGotUserInfo: function(e) {
    // console.log('userInfo:', e)
    this.login(e.detail.userInfo)
  },
  bindSubmit: function(e) {
    var formId = e.detail.formId
    console.log("formId:", formId)
    if (!formId || formId == 'the formId is a mock one' || formId == '' || formId == null) return
    app.globalData.formIds.push({
      formId: e.detail.formId,
      date: new Date().pattern('YYYY-MM-dd HH:mm:ss')
    })
  },
  sendVerifyCode: function(e) {
    if (this.data.timeCount > 0) {
      return
    }
    if (!this.verify(1)) return
    if (!checkPhone(this.data.phoneNumber)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    pRequest('xb/front/unAuth/wxMini/getLoginCode', {
      "clientId": "admin",
      "clientSecret": "901113222",
      "mobile": this.data.phoneNumber
    }).then((res) => {
      wx.showToast({
        title: '验证码已发送请注意查收',
        icon: 'none'
      })
      this.countDown()
    })
  },

  countDown: function() {
    this.data.timeCount = TIME_COUNT
    if (this.data.timer) return
    this.data.timer = setInterval(() => {
      // console.log('timeCount:', this.data.timeCount)
      if (this.data.timeCount > 0 && this.data.timeCount <= TIME_COUNT) {
        this.data.timeCount--
        this.setData({
          timeCount: this.data.timeCount
        })
      } else {
        clearInterval(this.data.timer)
        this.setData({
          timeCount: 0,
          timer: null
        })
      }
    }, 1000)
  },
  verify: function(type) {
    if (this.data.phoneNumber == null || this.data.phoneNumber == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return false
    }
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.phoneNumber)){
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
      return false
    }
    if (type == 1) {
      return true
    }
    if (!this.data.verifyCode || this.data.verifyCode == '') {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none'
      })
      return false
    }
    return true
  },

  login: function(e) {
    if (!this.verify(2)) return
    wx.showLoading({
      title: '登录中...',
    })
    pRequest('shop/login', {
      wxCode: wxCode,
      phone: this.data.phoneNumber,
      verifyCode: this.data.verifyCode
    }).then((res) => {
      // console.log('res:', res)
      if (res.token) {
        this.loginXb(res)
      } else {
        // wx.hideLoading()
        wx.showToast({
          title: '登录错误',
          icon: 'none'
        })
      }
    }).catch((res) => {
      console.log('error:',res)
      // wx.hideLoading()
    })
  },

  loginWx() {
    wx.showLoading({
      title: '微信登录中...',
    })
    var that = this
    wx.login({
      success: res => {
        if (res.code) {
          wxCode = res.code
          // app.initAccessToken(wxCode)
          wx.hideLoading()
          return
          pRequest('shop/login', {
            wxCode: res.code
          }).then((response) => {
            // wx.hideLoading()
            if (response.token) {
              that.loginXb(response)
            } else {
              wx.showToast({
                title: '请输入手机号验证码登录',
                icon: 'none'
              })
            }
          }).catch(() => {
            wx.hideLoading()
          })
        }
      }
    })
  },

  loginXb(resXb) {
    pRequest('xb/front/unAuth/saveCooperationPopularize' + "?mobile=" + resXb.phone + "&name=" + (resXb.loginName ? resXb.loginName : resXb.phone) + "&personType=" + (resXb.shopUserType == 1 ? 'charge' : 'counselor') + "&clientId=admin&clientSecret=901113222").then((res) => {

      setTimeout(()=>{
        wx.hideLoading()
      },2000)
      app.saveToken(resXb.token)
      app.setUserType(resXb.shopUserType)
      app.saveXbToken(res.token)
      app.savePhone(resXb.phone)
      debugger
      app.saveShopId(resXb.shopIds[0])
      if (res.popularizeUrl) {
        app.saveShareQuery(res.popularizeUrl.split('?')[1])
      }
      app.saveXbName(res.cooperationName)
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }).catch((err) => {
      // wx.hideLoading()
      console.log('err:', err)
    })
  }
})

function checkPhone(phone) {
  var pattern = /^1[34578]\d{9}$/;
  if (pattern.test(phone)) {
    return true;
  }
  // console.log('check mobile phone ' + phone + ' failed.');
  return false;
}