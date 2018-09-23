//index.js
//获取应用实例
import {
  pRequest
} from '../../utils/requestUtils.js'
const app = getApp()
import {
  formatCurrency
} from '../../utils/util.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showMarkhint: {
      title: '您还未绑定银行卡，马上绑定银行卡',
      button: '绑定银行卡'
    },
    showdot: true,
    accountInfo: {},
    inviteCount: 0,
    amount: 0,
    totalAmount:0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  entertixin(){
    wx.showToast({
      title: '暂未开通',
      icon: 'none'
    })

  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    this.getAccountInfo();
    this.getNumber();
    this.getUserData();
  },
  bankCardManage: function(e) {
    wx.navigateTo({
      url: '/pages/bankCard/bankCardManage/bankCardManage',
    })
  },
  inviteUser: function(e) {
    wx.navigateTo({
      url: '/pages/qrcode/qrcode',
    })
  },
  getAccountInfo() {
    pRequest('front/unAuth/wxMini/getIntegralData').then((res) => {
      this.setData({
        accountInfo: {
          'creditTotalAmount': res.creditTotalAmount,
          'creditAvailableAmount': formatCurrency(res.creditAvailableAmount),
          'creditFrozenAmount': formatCurrency(res.creditFrozenAmount),
        }
      })
    }).catch((err) => {

    })

  },
  //获取本月产生奖励和本月邀请人数
  getNumber() {
    pRequest("front/unAuth/myBalanceIntegralStat?phone=" + getApp().getPhone() + "&clientId=personal&clientSecret=personal").then((res) => {
      this.setData({
        inviteCount: res.inviteCount ? res.inviteCount : 0,
        amount: res.amount ? res.amount : 0,
        totalAmount: res.totalAmount ? res.totalAmount:0
      })
    }).catch((err) => {})
  },
  exit:function(e){
    getApp().saveToken(null);
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  getUserData() {
    pRequest('front/unAuth/wxMini/getUserData', {
      token: getApp().getToken()
    }).then((res) => {
      app.saveShareQuery(res.popularizeUrl.split('?')[1])
    }).catch((err) => {

    })
  },
})
