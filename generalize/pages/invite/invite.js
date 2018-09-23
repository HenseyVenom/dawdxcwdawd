// pages/invite/invite.js
import {
  pRequest, pGetRequest
} from '../../utils/requestUtils.js'
const app = getApp();
const TIME_COUNT = 60;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    verifyCode: '',
    timer: '',
    timeCount: '',
    inivtor: '',
    rtn: '',
    rts: '',
    showModal:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.rtn) {
      this.setData({
        rtn: options.rtn,
        rts: options.rts,
      })
    }
    // this.setData({
    //   rtn: 83,
    //   rts: 'personal',
    // })
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
    if (this.data.timeCount > 0) {
      return
    }
    if (!this.verify(1)) return
    pRequest('front/unAuth/send/sms/' + this.data.phoneNumber + "?client_id=test-app-client-id&client_secret=test-app-client-secret").then((res)=>{
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
  showProtocol: function(e) {
    wx.navigateTo({
      url: '/pages/protocol/protocol',
    })
  },
  login: function (e) {
    if (!this.verify(2)) return
    wx.showLoading({
      title: '注册中...',
    })
    pGetRequest('front/unAuth/sms/check/' + this.data.phoneNumber + '/code/' + this.data.verifyCode + '?client_id=test-app-client-id&client_secret=test-app-client-secret',{

    }).then((res)=>{
      this.registerByRecommender()
    }).catch((err)=>{
    })
    
  },
  registerByRecommender(){
    pRequest('front/unAuth/register?client_id=test-app-client-id&client_secret=test-app-client-secret', {
      mobile: this.data.phoneNumber,
      registerTraceNo: this.data.rtn,
      registerTraceSource: this.data.rts,
      registerType:'wap'
    }).then((res) => {
      if (res.isFirst){//新注册

      }else{//已注册

      }
      console.log('res:', res)
      wx.showToast({
        title: '注册成功',
      })
      // var that =this
      // wx.setClipboardData({
      //   data: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.xbkj.xuebei',
      //   success:(res)=>{
      //     that.setData({
      //       showModal:true
      //     })
      //   }
      // })
    }).catch((res) => {
      // wx.hideLoading()
    })
  },
  closeModal(){
    this.setData({
      showModal: false
    })
  }
})