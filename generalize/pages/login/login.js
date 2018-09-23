// pages/login/login.js
import {
  pRequest
} from '../../utils/requestUtils.js'
const app=getApp();
const TIME_COUNT=60;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    verifyCode: '',
    timer: '',
    timeCount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.isLogin()){
      // return
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    this.data.verifyCode = e.detail.value
  },
  verify: function(type) {
    if (this.data.phoneNumber == null || this.data.phoneNumber == '') {
      wx.showToast({
        title: '请填写电话号',
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
  sendVerifyCode: function(e) {
    if (!this.verify(1)) return
    pRequest('front/unAuth/wxMini/getLoginCode',{
      mobile: this.data.phoneNumber,
      clientId: 'admin',
      clientSecret: '901113222' 
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
      console.log('timeCount:', this.data.timeCount)
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
  onGotUserInfo: function(res) {
    console.log('userInfo:', res.detail)
  },
  login: function (e) {
    if (!this.verify(2)) return
    wx.showLoading({
      title: '登录中...',
    })
    pRequest('front/unAuth/wxMini/login',{
      mobile: this.data.phoneNumber,
      code: this.data.verifyCode,
      clientId: 'admin',
      clientSecret: '901113222' 
    }).then((res)=>{
      wx.hideLoading()
      app.saveToken(res)
      app.savePhoen(this.data.phoneNumber)
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }).catch((err)=>{
      wx.hideLoading()
    })
  }

})