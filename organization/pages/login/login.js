// pages/login/login.js
import {
  pRequest
} from '../../utils/requestUtils.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    timer: '',
    timeCount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.WXLogin()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  bindInputPhone: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  clearPhone: function(e) {
    this.setData({
      phoneNumber: ""
    })
  },
  bindInputPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  verify: function(type) {
    if (this.data.username == null || this.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return false
    }
    if (type == 1) {
      return true
    }
    if (!this.data.password || this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false
    }
    return true
  },
  onGotUserInfo: function(res) {
    console.log('userInfo:', res.detail)
  },
  login: function (e) {
    if (!this.verify(2)) return
    wx.showLoading({
      title: '登录中...',
    })
    let url = 'admin/unAuth/index/login?username='+ this.data.username +'&password=' + this.data.password+'&client_id=admin&client_secret=901113222'
    pRequest(url,{})
    .then(res=>{
      this.userlogin(res.current_sysuser_user.id) 
      app.saveUserId(res.current_sysuser_user.id)
    })   
  },
  WXLogin:function(){
    wx.login({
      success: function(res) {
        if(res.code) {
          debugger
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      },
     
    })
  },
  //获取token
  userlogin:function(id){
   
    wx.login({
      success: function (res) {
        // debugger
        if (res.code) {
          let url = "front/unAuth/wxMini/orgaLogin?userId=" + id + "&wxCode=" + res.code
          pRequest(url, {})
            .then(res => {
              app.saveToken(res)
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }, 1500)
             // this.getcardData()
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      },

    })
    
  },
  //获取银行卡信息
  getcardData:function(){
    pRequest('front/unAuth/wxMini/getUserData', {
      token: app.getToken()
    })
    .then(res => {
      let jsonstr = JSON.stringify(res)
      debugger
      app.savebank(jsonstr)
    })
  }

})