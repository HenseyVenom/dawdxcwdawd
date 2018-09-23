//index.js
//获取应用实例
const app = getApp()
import {
  pRequest
} from '../../utils/requestUtils.js'
import network from '../../network.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userType: null,
    pendingCount: 0,
    remindObj: {

    },
    Showremind: false,
    shopList: [],
    xbName: '',
    showQrcode: false,
    qrcodeType: 0,
    qrcodeUrl: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //弹出提醒弹框
  ShowremindModel() {
    this.setData({
      Showremind: true,
      remindObj: {}
    })
    this.getShopList()
  },
  //关闭提醒MOdel
  closeremindModel: function () {
    this.setData({
      Showremind: false
    })
  },
  //新增事项请求接口
  sureremind: function (e) {
    if (!this.data.remindObj.remindContent) {
      wx.showToast({
        title: '请输入注意事项',
        icon: 'none'

      })
      return
    }
    let reg = /[\u4e00-\u9fa5]/
    if (!reg.test(this.data.remindObj.remindContent)){
          wx.showToast({
            title: '注意事项必须包含中文',
            icon: 'none'
          })
           return    
      }

    if (!this.data.remindObj.shopId) {
      wx.showToast({
        title: '请选择选择门店',
        icon: 'none'
      })
      return
    }
    if (!this.data.remindObj.remindDate) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
      return
    }
    if (!this.data.remindObj.remindTime) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
      })
      return
    }
    let date = this.data.remindObj.remindDate + ' ' + this.data.remindObj.remindTime + ':00'
    //debugger
    pRequest('com/task/remind', {
      remarks: this.data.remindObj.remindContent,
      clueDate: date,
      shopId: this.data.remindObj.shopId,
      clueType: 5
    }).then((res) => {
      this.setData({
        Showremind: false,
      })
      this.getPendingCount()
    })
  },
  //新增事项Model的textarea
  remindgetValue: function (e) {
    let remindContent = 'remindObj.remindContent'
    this.setData({
      [remindContent]: e.detail.value
    })
  },
  ////新增事项Model的门店
  bindshopChange: function (e) {

    let shopName = 'remindObj.shopName';
    let shopId = 'remindObj.shopId';
    this.setData({
      [shopId]: this.data.shopList[e.detail.value].id,
      [shopName]: this.data.shopList[e.detail.value].shopName
    })

  },
  //新增事项Model的时间
  remindTimeChange: function (e) {
    let remindTime = 'remindObj.remindTime'
    this.setData({
      [remindTime]: e.detail.value
    })

  },
  //新增事项Model的日期
  remindDateChange: function (e) {
    let remindDate = 'remindObj.remindDate'
    this.setData({
      [remindDate]: e.detail.value
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // debugger
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // debugger
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
          //debugger
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(e) {
    this.setData({
      userType: app.getUserType(),
      xbName: app.getXbName()
    })
    //debugger
    this.getPendingCount()

  },
  getShopList: function () {

    pRequest('shop/findListByPersonId', {})
      .then(res => {
        this.setData({
          shopList: res
        })
      })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    //debugger
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  itemClick(e) {
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/' + name + '/' + name,
    })
  },
  getPendingCount() {
    pRequest('com/clue/waitingProcessCount', {}).then((res) => {
      if (res != 0) {
        this.setData({
          pendingCount: res
        })
      } else {
        this.setData({
          pendingCount: 0
        })
      }
    })
  },
  launchAppError(err) {
    console.log('err:', err)
  },
  qrcodeClick(e) {
    var type = e.currentTarget.dataset.name
    this.setData({
      qrcodeType: type,
      showQrcode: true,
    })
    if(type==1){
      var content = '/pages/payToShop?' + app.getShareQuery()+"&shopId="+app.getShopId()
      this.qrcodeFun(this,content)
    }else{
      var content = network.webUrl + "/miniProgram/shopLanding?" + app.getShareQuery() + '&id=' + app.getShopId()
      this.qrcodeFun(this,content)
    }
  },
  preventTouchMove(){},
  //生成二维码
  qrcodeFun: function (that,content) {
    let url = network.codeUrl + 'front/unAuth/wxMini/getQRCode'
    // var contentAddress = '/pages/payToShop?' + app.getShareQuery()+"&shopId="+app.getShopId()
    wx.request({
      url: url, //生成二维码的地址
      method: 'POST',
      responseType: 'arraybuffer',
      data: {
        'content': content,
        "width": 430,
        "height": 430
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var src2 = wx.arrayBufferToBase64(res.data); //对数据进行转换操
        that.setData({
          showQrcode: true,
          qrcodeUrl: 'data:image/png;base64,' + src2
        })
      }
    })
  },
  closeqrcodeModel() {
    this.setData({
      showQrcode: false,
      qrcodeType: 0
    })
  },

})